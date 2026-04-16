const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const transport = nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transport.sendMail({
      from:    `"FGDS Contact Form" <${process.env.SMTP_USER}>`,
      to:      'info@frozengaragedoorsolutions.com',
      replyTo: email,
      subject: `Contact form message from ${name}`,
      text:    `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html:    `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] send error:', err);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
};
