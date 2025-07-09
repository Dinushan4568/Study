document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const res = await fetch('php/auth.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password})
  });
  const data = await res.json();
  if (data.success) {
    localStorage.setItem('role', data.role);
    localStorage.setItem('username', username);
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('loginError').textContent = data.message;
  }
});

// Registration logic
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch('php/register.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const result = await res.json();
    document.getElementById('registerMsg').textContent = result.success ? 'Account created! You can now log in.' : (result.message || 'Error');
    if (result.success) form.reset();
  });
}
