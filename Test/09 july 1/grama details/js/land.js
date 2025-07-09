// Add Land Record
if (document.getElementById('addLandForm')) {
  document.getElementById('addLandForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch('php/land.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const result = await res.json();
    document.getElementById('addLandMsg').textContent = result.success ? 'Added!' : (result.message || 'Error');
    if (result.success) form.reset();
  });
}
