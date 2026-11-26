document.addEventListener('DOMContentLoaded', () => {
  const form1 = document.getElementById('form-pesanan-1');
  const ktpInput = document.getElementById('ktp');

  const savedData = JSON.parse(localStorage.getItem('rentalData')) || {};
  if (savedData.nama) document.getElementById('nama').value = savedData.nama;
  if (savedData.wa) document.getElementById('wa').value = savedData.wa;
  if (savedData.email) document.getElementById('email').value = savedData.email;
  if (savedData.alamat) document.getElementById('alamat').value = savedData.alamat;
  if (savedData.ktpImage) ktpInput.removeAttribute('required');

  form1.addEventListener('submit', (e) => {
    e.preventDefault();
    const file = ktpInput.files[0];

    const simpanTahap1 = (base64Image) => {
      const currentData = JSON.parse(localStorage.getItem('rentalData')) || {};
      const updatedData = {
        ...currentData,
        nama: document.getElementById('nama').value.trim(),
        wa: document.getElementById('wa').value.trim(),
        email: document.getElementById('email').value.trim(),
        alamat: document.getElementById('alamat').value.trim(),
        ktpImage: base64Image || currentData.ktpImage || null
      };

      localStorage.setItem('rentalData', JSON.stringify(updatedData));
      window.location.href = 'katalog.html';
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => simpanTahap1(event.target.result);
      reader.readAsDataURL(file);
    } else {
      simpanTahap1(null);
    }
  });
});
