/* ============================================================
   ORDER.JS — Form validation, live summary, confirmation
   Reads MUSTANGS array from mustangs.js (loaded first)
   ============================================================ */

const form = document.getElementById('orderForm');
const modelSel = document.getElementById('model');
const yearSel = document.getElementById('year');
const sModel = document.getElementById('sModel');
const sPrice = document.getElementById('sPrice');
const sColor = document.getElementById('sColor');
const sOpts = document.getElementById('sOpts');
const sTotal = document.getElementById('sTotal');
const confirmModal = document.getElementById('confirmModal');
const orderRefEl = document.getElementById('orderRef');

/* Populate model select */
MUSTANGS.forEach(m => {
  const opt = document.createElement('option');
  opt.value = m.id;
  opt.textContent = `${m.name} (${m.year})`;
  modelSel.appendChild(opt);
});

/* Pre-select from URL ?model=id */
const urlParams = new URLSearchParams(location.search);
const preselect = urlParams.get('model');
if (preselect && MUSTANGS.find(m => m.id === preselect)) {
  modelSel.value = preselect;
  updateYears();
  updateSummary();
}

/* Years per model (simple — same year + up to 2 previous) */
function updateYears() {
  const m = MUSTANGS.find(x => x.id === modelSel.value);
  yearSel.innerHTML = '<option value="">-- Choose year --</option>';
  if (!m) return;
  for (let y = m.year; y >= m.year - 2; y--) {
    const o = document.createElement('option');
    o.value = y; o.textContent = y;
    yearSel.appendChild(o);
  }
  yearSel.value = m.year;
}

/* Quantity price multiplier */
function qty() {
  const v = parseInt(document.getElementById('qty').value, 10) || 1;
  return Math.min(Math.max(v, 1), 10);
}

/* Live summary */
function updateSummary() {
  const m = MUSTANGS.find(x => x.id === modelSel.value);
  const color = document.getElementById('extColor').value;
  const trans = document.getElementById('trans').value;
  const int = document.getElementById('intColor').value;

  if (!m) {
    sModel.textContent = '—'; sPrice.textContent = '—';
    sColor.textContent = '—'; sOpts.textContent = '—';
    sTotal.textContent = '₹0';
    return;
  }
  sModel.textContent = `${m.name} · ${yearSel.value || m.year}`;
  sPrice.textContent = m.priceLabel;
  sColor.textContent = color || '—';

  const optsArr = [];
  if (trans) optsArr.push(trans);
  if (int) optsArr.push(int + ' interior');
  sOpts.textContent = optsArr.length ? optsArr.join(' · ') : '—';

  const total = m.price * qty();
  sTotal.textContent = '₹' + total.toLocaleString('en-IN');
}

/* Attach listeners */
['model'].forEach(id => document.getElementById(id)?.addEventListener('change', () => { updateYears(); updateSummary(); }));
['year','extColor','intColor','trans','qty'].forEach(id =>
  document.getElementById(id)?.addEventListener('input', updateSummary)
);

/* ---------- Validation ---------- */
function setError(fieldEl, hasError) {
  const wrap = fieldEl.closest('.field');
  wrap.classList.toggle('error', hasError);
}

function validateField(el) {
  const val = (el.value || '').trim();
  let bad = false;
  if (el.hasAttribute('required') && !val) bad = true;
  if (el.type === 'email' && val) bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  if (el.type === 'tel' && val) bad = !/^[+\d][\d\s\-()]{6,}$/.test(val);
  if (el.type === 'number') {
    const n = parseInt(val, 10);
    if (isNaN(n) || n < 1 || n > 10) bad = true;
  }
  setError(el, bad);
  return !bad;
}

form?.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('blur', () => validateField(el));
  el.addEventListener('input', () => { if (el.closest('.field').classList.contains('error')) validateField(el); });
});

/* ---------- Submit ---------- */
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
  let allOk = true;
  fields.forEach(el => { if (!validateField(el)) allOk = false; });
  if (!allOk) {
    showToast('⚠ Please fix the highlighted fields.');
    form.querySelector('.field.error input, .field.error select')?.focus();
    return;
  }
  // Build reference
  const ref = 'MUSTANG-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  orderRefEl.textContent = ref;
  orderRefEl.dataset.ref = ref;

  // Store snapshot for download
  const m = MUSTANGS.find(x => x.id === modelSel.value);
  orderRefEl.dataset.summary = JSON.stringify({
    ref,
    name: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    country: document.getElementById('country').value,
    city: document.getElementById('city').value,
    model: m ? m.name : '',
    year: yearSel.value,
    ext: document.getElementById('extColor').value,
    int: document.getElementById('intColor').value,
    trans: document.getElementById('trans').value,
    qty: qty(),
    date: document.getElementById('date').value,
    notes: document.getElementById('notes').value,
    total: m ? m.price * qty() : 0
  });

  // Show confirmation
  confirmModal.classList.add('open');
  confirmModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Also toast
  showToast('✓ Order request submitted.');
});

/* ---------- Close confirmation ---------- */
document.querySelector('#confirmModal .modal-close')?.addEventListener('click', () => {
  confirmModal.classList.remove('open');
  document.body.style.overflow = '';
});
confirmModal?.addEventListener('click', e => {
  if (e.target === confirmModal) { confirmModal.classList.remove('open'); document.body.style.overflow = ''; }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { confirmModal.classList.remove('open'); document.body.style.overflow = ''; } });

/* ---------- Download order summary (as .txt) ---------- */
document.getElementById('downloadBtn')?.addEventListener('click', () => {
  const data = JSON.parse(orderRefEl.dataset.summary || '{}');
  const text =
`MUSTANG DEALERSHIP — ORDER REQUEST SUMMARY
============================================
Order Reference : ${data.ref}
Date            : ${new Date().toLocaleString()}

CUSTOMER
--------
Name    : ${data.name}
Email   : ${data.email}
Phone   : ${data.phone}
Country : ${data.country}
City    : ${data.city}

VEHICLE
-------
Model        : ${data.model}
Year         : ${data.year}
Exterior     : ${data.ext}
Interior     : ${data.int}
Transmission : ${data.trans}
Quantity     : ${data.qty}
Delivery     : ${data.date}

Notes / Requirements
--------------------
${data.notes || '(none)'}

Estimated Total: ₹${data.total.toLocaleString('en-IN')}

--------------------------------------------
This is a dealership ORDER REQUEST. No payment has been taken.
Prices are estimates / dealer indicative and may vary.
Not affiliated with Ford Motor Company.
`;
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.ref}-summary.txt`;
  a.click();
  URL.revokeObjectURL(url);
});