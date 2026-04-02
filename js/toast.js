let timer;

export function showToast(msg) {
  const el = document.getElementById('toast-root');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove('show'), 3000);
}
