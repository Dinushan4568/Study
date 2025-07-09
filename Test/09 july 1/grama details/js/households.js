// Add Household
if (document.getElementById('addHouseholdForm')) {
  document.getElementById('addHouseholdForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch('php/households.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const result = await res.json();
    document.getElementById('addHouseholdMsg').textContent = result.success ? 'Added!' : (result.message || 'Error');
    if (result.success) form.reset();
  });
}
