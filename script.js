const url = 'https://script.google.com/macros/s/AKfycbzKnebfaqptl2O5QDrZfakE6rUp39PdIw1GM3g4NSEfFu9dVXC1KnNEUiGXrMOziXmG/exec';

document.addEventListener('DOMContentLoaded', () => {
  fetchDataAndRenderTable();

  document.getElementById('createForm').addEventListener('submit', (e) => {
    e.preventDefault();
    createData();
  });
});

function fetchDataAndRenderTable() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('tableBody');
      tableBody.innerHTML = '';

      data.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.ID}</td>
          <td>${row.NAMA}</td>
          <td>${row.USERNAME}</td>
          <td>${row.LEVEL}</td>
          <td>
            <button class="action-btn edit-btn" onclick="editData(${index}, '${row.ID}', '${row.NAMA}', '${row.USERNAME}', '${row.LEVEL}')">Edit</button>
            <button class="action-btn delete-btn" onclick="deleteData('${row.ID}')">Delete</button>
          </td>
        `;
        tableBody.appendChild(tr);
      });
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

  const formData = new FormData();
  formData.append('action', 'create');
  formData.append('ID', id);
  formData.append('NAMA', nama);
  formData.append('USERNAME', username);
  formData.append('LEVEL', level);

  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    alert(result.message || 'Data berhasil ditambahkan');
    fetchDataAndRenderTable();
    document.getElementById('createForm').reset();
  })
  .catch(error => console.error('Error:', error));
}

function deleteData(id) {
  if (!confirm(`Yakin ingin menghapus data dengan ID: ${id}?`)) return;

  const formData = new FormData();
  formData.append('action', 'delete');
  formData.append('ID', id);

  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    alert(result.message || 'Data berhasil dihapus');
    fetchDataAndRenderTable();
  })
  .catch(error => console.error('Error:', error));
}

function editData(index, id, nama, username, level) {
  const newNama = prompt('Edit Nama:', nama);
  const newUsername = prompt('Edit Username:', username);
  const newLevel = prompt('Edit Level:', level);

  if (newNama === null || newUsername === null || newLevel === null) return;

  const formData = new FormData();
  formData.append('action', 'update');
  formData.append('ID', id);
  formData.append('NAMA', newNama);
  formData.append('USERNAME', newUsername);
  formData.append('LEVEL', newLevel);

  fetch(url, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    alert(result.message || 'Data berhasil diupdate');
    fetchDataAndRenderTable();
  })
  .catch(error => console.error('Error:', error));
}
