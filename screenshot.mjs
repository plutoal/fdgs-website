import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHROME = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
const SHOTS_DIR = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR, { recursive: true });

function nextIndex(label) {
  const files = fs.existsSync(SHOTS_DIR) ? fs.readdirSync(SHOTS_DIR) : [];
  const nums = files
    .map(f => { const m = f.match(/^screenshot-(\d+)/); return m ? parseInt(m[1]) : 0; })
    .filter(Boolean);
  return (nums.length ? Math.max(...nums) : 0) + 1;
}

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';
const idx   = nextIndex();
const file  = path.join(SHOTS_DIR, `screenshot-${idx}${label}.png`);

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900 },
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 800)); // allow animations to settle
  await page.screenshot({ path: file, fullPage: false });
  await browser.close();
  console.log(`Screenshot saved: ${file}`);
})();
