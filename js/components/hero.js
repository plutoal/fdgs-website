export function HeroHTML(heroVideo = "docs/videoplayback_fgds.mp4") {
  return `
    <section id="hero">
      <div class="hero-grid"></div>
      <div class="hero-noise"></div>
      <div id="particles" style="position:absolute;inset:0;pointer-events:none;overflow:hidden;"></div>

      <div class="hero-inner" id="hero-inner">

        <!-- ── Text column ── -->
        <div class="hero-text-col">
          <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(255, 255, 255, 0.8);
                      border:1px solid rgba(255,255,255,0.11);border-radius:100px;padding:6px 16px;
                      margin-bottom:32px;font-size:0.8rem;color:rgb(11, 11, 11);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2695c8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Free Canada-wide Shipping
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
        <div class="hero-video-col" id="hero-video-col" style="position:relative;">
          <video id="hero-video" autoplay muted playsinline
                 style="width:100%;height:100%;object-fit:cover;border-radius:20px;display:block;">
            <source src="${heroVideo}" type="video/mp4">
          </video>
          <button id="playBtn" style="position:absolute;bottom:12px;left:12px;z-index:10;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.2);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);transition:background 0.15s;" onmouseover="this.style.background='rgba(0,0,0,0.7)'" onmouseout="this.style.background='rgba(0,0,0,0.45)'" aria-label="Play/Pause">
            <svg id="playIcon" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
          </button>
          <button id="muteBtn" style="position:absolute;bottom:12px;right:12px;z-index:10;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.2);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);transition:background 0.15s;" onmouseover="this.style.background='rgba(0,0,0,0.7)'" onmouseout="this.style.background='rgba(0,0,0,0.45)'" aria-label="Toggle mute">
            <svg id="muteIcon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
          </button>
        </div>

      </div>

      <div class="scroll-cue" style="position:absolute;bottom:18px;left:60%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;color:rgba(255,255,255,0.25);">
        <span style="font-size:0.7rem;letter-spacing:0.08em;text-transform:uppercase;">Scroll</span>
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      </div>
    </section>

    
    </div>`;
}

export function initHero() {
  initParticles();
  setTimeout(() => {
    document.getElementById("hero-inner")?.classList.add("hero-revealed");
  }, 2000);

  const video = document.getElementById("hero-video");
  const muteBtn = document.getElementById("muteBtn");
  const muteIcon = document.getElementById("muteIcon");
  const playBtn = document.getElementById("playBtn");
  const playIcon = document.getElementById("playIcon");

  if (muteBtn && video) {
    muteBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      muteIcon.innerHTML = video.muted
        ? `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`
        : `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>`;
      muteBtn.setAttribute("aria-label", video.muted ? "Unmute" : "Mute");
    });
  }

  if (playBtn && video) {
    const setPlayIcon = () => {
      playIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
      playBtn.setAttribute("aria-label", "Play");
    };
    const setPauseIcon = () => {
      playIcon.innerHTML = `<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>`;
      playBtn.setAttribute("aria-label", "Pause");
    };

    playBtn.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        setPauseIcon();
      } else {
        video.pause();
        setPlayIcon();
      }
    });

    video.addEventListener("ended", setPlayIcon);
  }
}

function initParticles() {
  const c = document.getElementById("particles");
  if (!c) return;
  for (let i = 0; i < 24; i++) {
    const p = document.createElement("div");
    p.className = "fp";
    const sz = Math.random() * 3 + 1;
    const blue = Math.random() > 0.4;
    p.style.cssText = `
      left:${Math.random() * 100}%;
      bottom:${Math.random() * 15}%;
      width:${sz}px; height:${sz}px;
      background:${blue ? "rgba(38,149,200," : "rgba(255,255,255,"}${(Math.random() * 0.4 + 0.15).toFixed(2)});
      animation-duration:${(Math.random() * 9 + 6).toFixed(1)}s;
      animation-delay:${(Math.random() * 10).toFixed(1)}s;`;
    c.appendChild(p);
  }
}
