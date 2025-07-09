window.onload = async function() {
  const res = await fetch('php/users.php');
  const users = await res.json();
  const tbody = document.querySelector('#usersTable tbody');
  tbody.innerHTML = '';
  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${user.username}</td><td>${user.role}</td><td>
      <select>
        <option value="admin">admin</option>
        <option value="gramasewaka">gramasewaka</option>
        <option value="data_adder">data_adder</option>
      </select></td><td><button class="promoteBtn">Promote</button></td>`;
    tr.querySelector('select').value = user.role;
    tr.querySelector('.promoteBtn').onclick = async function() {
      const new_role = tr.querySelector('select').value;
      const res2 = await fetch('php/promotion.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id: user.user_id, new_role})
      });
      const result = await res2.json();
      document.getElementById('promotionMsg').textContent = result.success ? 'Role updated!' : (result.message || 'Error');
    };
    tbody.appendChild(tr);
  });
};
