export function HeroHTML() {
  return `
    <section id="hero">
      <div class="hero-grid"></div>
      <div class="hero-noise"></div>
      <div id="particles" style="position:absolute;inset:0;pointer-events:none;overflow:hidden;"></div>

      <div class="hero-inner" id="hero-inner">

        <!-- ── Text column ── -->
        <div class="hero-text-col">
          <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.06);
                      border:1px solid rgba(255,255,255,0.11);border-radius:100px;padding:6px 16px;
                      margin-bottom:32px;font-size:0.8rem;color:rgba(255,255,255,0.55);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2695c8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Canada-wide Shipping
          </div>

          <h1 class="hero-h1 font-display font-black">
            <span> No More Frozen<br></span>
            <span style="color:#2695c8;">Garage Doors</span>
          </h1>

          <div class="hero-cta-row">
            <a href="#catalog" class="btn btn-primary" style="padding:14px 32px;font-size:1rem;border-radius:12px;">
              Shop Now
            </a>
          </div>
        </div>

        <!-- ── Video column ── -->
        <div class="hero-video-col" id="hero-video-col">
          <video id="hero-video" autoplay muted playsinline
                 style="width:100%;height:100%;object-fit:cover;border-radius:20px;display:block;">
            <source src="docs/videoplayback_fdgs.mp4" type="video/mp4">
          </video>
        </div>

      </div>

      <div class="scroll-cue" style="position:absolute;bottom:36px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;color:rgba(255,255,255,0.25);">
        <span style="font-size:0.7rem;letter-spacing:0.08em;text-transform:uppercase;">Scroll</span>
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      </div>
    </section>

    <div style="background:#111;padding:20px 24px;border-top:1px solid rgba(255,255,255,0.06);">
      <div style="max-width:1280px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:32px 48px;">
      </div>
    </div>`;
}

export function initHero() {
  initParticles();
  setTimeout(() => {
    document.getElementById('hero-inner')?.classList.add('hero-revealed');
  }, 2000);
}

function initParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'fp';
    const sz   = Math.random() * 3 + 1;
    const blue = Math.random() > 0.4;
    p.style.cssText = `
      left:${Math.random() * 100}%;
      bottom:${Math.random() * 15}%;
      width:${sz}px; height:${sz}px;
      background:${blue ? 'rgba(38,149,200,' : 'rgba(255,255,255,'}${(Math.random() * 0.4 + 0.15).toFixed(2)});
      animation-duration:${(Math.random() * 9 + 6).toFixed(1)}s;
      animation-delay:${(Math.random() * 10).toFixed(1)}s;`;
    c.appendChild(p);
  }
}
