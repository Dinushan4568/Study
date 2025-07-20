// Theme toggle logic
function setTheme(mode) {
  if (mode === 'dark') {
    document.body.classList.add('darkmode');
    document.getElementById('toggleModeBtn').textContent = '☀️ ';
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('darkmode');
    document.getElementById('toggleModeBtn').textContent = '🌙 ';
    localStorage.setItem('theme', 'light');
  }
}
function toggleTheme() {
  if (document.body.classList.contains('darkmode')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}
document.addEventListener('DOMContentLoaded', function() {
  const saved = localStorage.getItem('theme');
  setTheme(saved === 'dark' ? 'dark' : 'light');
  document.getElementById('toggleModeBtn').onclick = toggleTheme;
});
