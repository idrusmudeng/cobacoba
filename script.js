const url = 'https://script.google.com/macros/s/AKfycbzKnebfaqptl2O5QDrZfakE6rUp39PdIw1GM3g4NSEfFu9dVXC1KnNEUiGXrMOziXmG/exec';

document.addEventListener('DOMContentLoaded', () => {
  fetchDataAndRenderTable();
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

  // Bersihkan tabel dulu
  tableHeader.innerHTML = '';
  tableBody.innerHTML = '';

  // Buat Header Table
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    tableHeader.appendChild(th);
  });

  // Buat Baris Data
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
