// Dynamically load the navbar from components/navbar.html
async function loadNavbar() {
  const res = await fetch('components/navbar.html');
  const html = await res.text();
  const navContainer = document.createElement('div');
  navContainer.innerHTML = html;
  document.body.insertBefore(navContainer.firstElementChild, document.body.firstChild);
}

window.addEventListener('DOMContentLoaded', async () => {
  await loadNavbar();
  // Re-initialize theme and logout button after navbar is loaded
  if (window.setTheme) {
    const saved = localStorage.getItem('theme');
    setTheme(saved === 'dark' ? 'dark' : 'light');
    document.getElementById('toggleModeBtn').onclick = toggleTheme;
  }
  if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').onclick = function() {
      localStorage.clear();
      window.location.href = 'index.html';
    };
  }
  // Show promotion link for admin
  if (localStorage.getItem('role') === 'admin') {
    const promo = document.getElementById('promotionLink');
    if (promo) promo.style.display = 'inline-block';
  }
});