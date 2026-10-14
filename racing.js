/* ============================================================
   RACING.JS — Video controls (play/pause, mute, fullscreen)
   ============================================================ */
const vid = document.getElementById('racingVideo');
const playBtn = document.getElementById('playPause');
const muteBtn2 = document.getElementById('muteVideo');
const fsBtn2 = document.getElementById('fsVideo');

if (vid) {
  // Browsers require muted for autoplay; we keep it muted but
  // the user can unmute via the button — a fresh user gesture
  // is enough to allow sound.
  vid.muted = true;

  playBtn?.addEventListener('click', () => {
    if (vid.paused) { vid.play(); playBtn.textContent = '⏸'; }
    else { vid.pause(); playBtn.textContent = '▶'; }
  });

  muteBtn2?.addEventListener('click', () => {
    vid.muted = !vid.muted;
    muteBtn2.textContent = vid.muted ? '🔇' : '🔊';
  });

  fsBtn2?.addEventListener('click', () => {
    if (!document.fullscreenElement) vid.requestFullscreen?.();
    else document.exitFullscreen?.();
  });

  // If user starts unmuted from main engine button, sync:
  const mainMute = document.getElementById('muteBtn');
  if (mainMute) {
    mainMute.addEventListener('click', () => {
      vid.muted = !vid.muted;
      if (muteBtn2) muteBtn2.textContent = vid.muted ? '🔇' : '🔊';
    });
  }
}