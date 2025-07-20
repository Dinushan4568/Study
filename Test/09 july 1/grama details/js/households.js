// Add Household
if (document.getElementById('addHouseholdForm')) {
  document.getElementById('addHouseholdForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    // Convert members_nics to array (split by comma, trim spaces)
    if (data.members_nics) {
      data.members_nics = data.members_nics.split(',').map(nic => nic.trim()).filter(nic => nic);
    } else {
      data.members_nics = [];
    }
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
