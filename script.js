const url = 'https://script.google.com/macros/s/AKfycbzKnebfaqptl2O5QDrZfakE6rUp39PdIw1GM3g4NSEfFu9dVXC1KnNEUiGXrMOziXmG/exec';

document.addEventListener('DOMContentLoaded', () => {
  fetchDataAndRenderTable();

  // Form submit handler
  const form = document.getElementById('createForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    createData();
  });
});

function fetchDataAndRenderTable() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        renderTable(data);
      } else {
        console.error('Data kosong atau format tidak sesuai');
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}

function renderTable(data) {
  const headers = Object.keys(data[0]);
  const tableHeader = document.getElementById('tableHeader');
  const tableBody = document.getElementById('tableBody');

  tableHeader.innerHTML = '';
  tableBody.innerHTML = '';

  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    tableHeader.appendChild(th);
  });

  data.forEach(row => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
      const td = document.createElement('td');
      td.textContent = row[header];
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
}

function createData() {
  const id = document.getElementById('idInput').value.trim();
  const nama = document.getElementById('namaInput').value.trim();
  const username = document.getElementById('usernameInput').value.trim();
  const level = document.getElementById('levelInput').value.trim();

  if (!id || !nama || !username || !level) {
    alert('Semua field harus diisi!');
    return;
  }

  const payload = {
    action: 'create',
    ID: id,
    NAMA: nama,
    USERNAME: username,
    LEVEL: level
  };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(result => {
    alert(result.message || 'Data berhasil ditambahkan');
    // Refresh data table setelah tambah
    fetchDataAndRenderTable();
    // Reset form
    document.getElementById('createForm').reset();
  })
  .catch(error => console.error('Error submitting data:', error));
}
 
