// Add Individual
if (document.getElementById('addIndividualForm')) {
  document.getElementById('addIndividualForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch('php/individuals.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    const result = await res.json();
    document.getElementById('addIndividualMsg').textContent = result.success ? 'Added!' : (result.message || 'Error');
    if (result.success) form.reset();
  });
}
// View Individuals
if (document.getElementById('individualsTable')) {
  window.onload = async function() {
    const res = await fetch('php/individuals.php');
    const individuals = await res.json();
    const tbody = document.querySelector('#individualsTable tbody');
    tbody.innerHTML = '';
    individuals.forEach(ind => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${ind.nic}</td><td>${ind.full_name}</td><td>${ind.gender}</td><td>${ind.address}</td><td>${ind.mobile}</td><td>${ind.birthdate}</td><td>${ind.job}</td><td>${ind.married == 1 ? 'Yes' : 'No'}</td><td>${ind.land_id || ''}</td>`;
      tbody.appendChild(tr);
    });
  };
}
