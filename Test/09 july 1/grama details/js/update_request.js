// Submit Update Request
if (document.getElementById('updateRequestForm')) {
  document.getElementById('updateRequestForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    data.requested_by = localStorage.getItem('user_id') || 1; // fallback for demo
    const res = await fetch('php/update_request.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const result = await res.json();
    document.getElementById('updateRequestMsg').textContent = result.success ? 'Request submitted!' : (result.message || 'Error');
    if (result.success) form.reset();
  });
}
