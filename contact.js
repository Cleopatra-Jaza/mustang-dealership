/* ============================================================
   CONTACT.JS — Simple contact form with validation + confirmation
   ============================================================ */
const cForm = document.getElementById('contactForm');

function cSetError(el, bad) {
  el.closest('.field').classList.toggle('error', bad);
}
function cValidate(el) {
  const v = (el.value || '').trim();
  let bad = false;
  if (el.hasAttribute('required') && !v) bad = true;
  if (el.type === 'email' && v) bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  if (el.type === 'tel' && v) bad = !/^[+\d][\d\s\-()]{6,}$/.test(v);
  cSetError(el, bad);
  return !bad;
}

cForm?.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('blur', () => cValidate(el));
  el.addEventListener('input', () => { if (el.closest('.field').classList.contains('error')) cValidate(el); });
});

cForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;
  cForm.querySelectorAll('input[required], textarea[required]').forEach(el => {
    if (!cValidate(el)) ok = false;
  });
  if (!ok) { showToast('⚠ Please fix the highlighted fields.'); return; }
  showToast('✓ Message sent — we\'ll be in touch soon.');
  cForm.reset();
});