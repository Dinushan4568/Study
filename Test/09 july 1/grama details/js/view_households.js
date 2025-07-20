window.onload = async function() {
  const res = await fetch('php/view_households.php');
  const households = await res.json();
  const tbody = document.querySelector('#householdsTable tbody');
  tbody.innerHTML = '';
  households.forEach(hh => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${hh.house_number}</td><td>${hh.family_name}</td><td>${hh.address}</td><td>${hh.members.join(', ')}</td>`;
    tbody.appendChild(tr);
  });
};
