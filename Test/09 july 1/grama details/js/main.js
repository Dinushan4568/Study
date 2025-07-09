document.getElementById('logoutBtn').onclick = function() {
  localStorage.clear();
  window.location.href = 'index.html';
};
window.onload = function() {
  if (localStorage.getItem('role') === 'admin') {
    document.getElementById('promotionLink').style.display = 'block';
  }
};
