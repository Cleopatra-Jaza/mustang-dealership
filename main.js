/* ============================================================
   MAIN.JS — Shared logic across all 5 pages
   Loader, navbar, mobile menu, engine sound, back-to-top, toast
   ============================================================ */

/* ---------- Loader ---------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => loader.classList.add('hidden'), 400);
});

/* ---------- Navbar scroll state ---------- */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ---------- Mobile menu ---------- */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    })
  );
}

/* ---------- Back to top ---------- */
const backTop = document.querySelector('.back-to-top');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- Toast helper (reusable) ---------- */
function showToast(msg, ms = 3200) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), ms);
}
window.showToast = showToast;

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal, .car-card, .hero-stat').forEach(el => io.observe(el));

/* ============================================================
   ENGINE SOUND — Only on HOME & RACING pages
   Uses Web Audio API to SYNTHESIZE a Mustang-like engine rumble
   (no external file needed — works out of the box)
   ============================================================ */
(function initEngineSound() {
  const startBtn = document.getElementById('engineBtn');
  const muteBtn  = document.getElementById('muteBtn');
  const racingVideo = document.getElementById('racingVideo');
  if (!startBtn && !muteBtn) return;

  let audioCtx, masterGain, oscillators = [], muted = false, running = false, lfo;

  function buildEngine() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(audioCtx.destination);

    // Low V8 rumble — several detuned saw oscillators
    const baseFreqs = [55, 82.5, 110, 165];
    baseFreqs.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = i % 2 === 0 ? 'sawtooth' : 'square';
      osc.frequency.value = freq;
      filter.type = 'lowpass';
      filter.frequency.value = 420;
      gain.gain.value = 0.18 / (i + 1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      osc.start();
      oscillators.push(osc);
    });

    // LFO for subtle engine "rev" wobble
    lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 0.6;
    lfoGain.gain.value = 6;
    lfo.connect(lfoGain);
    oscillators.forEach(o => lfoGain.connect(o.frequency));
    lfo.start();
  }

  function startEngine() {
    if (!audioCtx) buildEngine();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    running = true;
    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(muted ? 0 : 0.55, audioCtx.currentTime + 0.9);

    if (startBtn) {
      startBtn.classList.add('off');
      startBtn.innerHTML = '⏸ ENGINE ON';
    }
    if (muteBtn) {
      muteBtn.classList.remove('off');
      muteBtn.innerHTML = '🔊 <span class="txt">MUTE</span>';
    }
    showToast('🔊 Engine sound activated — drive safely.');
  }

  function stopEngine() {
    if (!audioCtx) return;
    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
    running = false;
    if (startBtn) {
      startBtn.classList.remove('off');
      startBtn.innerHTML = '▶ START ENGINE';
    }
  }

  function toggleMute() {
    if (!audioCtx) { startEngine(); return; }
    muted = !muted;
    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(
      muted ? 0 : (running ? 0.55 : 0), audioCtx.currentTime + 0.4
    );
    if (muteBtn) {
      muteBtn.classList.toggle('off', muted);
      muteBtn.innerHTML = muted
        ? '🔇 <span class="txt">UNMUTE</span>'
        : '🔊 <span class="txt">MUTE</span>';
    }
    // Sync with racing video audio too
    if (racingVideo) racingVideo.muted = muted || !running;
  }

  if (startBtn) startBtn.addEventListener('click', () => running ? stopEngine() : startEngine());
  if (muteBtn)  muteBtn.addEventListener('click', toggleMute);
})();