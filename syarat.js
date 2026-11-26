document.addEventListener('DOMContentLoaded', () => {
  const savedData = JSON.parse(localStorage.getItem('rentalData')) || {};

  const form3 = document.getElementById('form-pesanan-3');
  if (form3) {
    const totalEl = document.getElementById('total-biaya');
    if (totalEl) {
      let totalAwal = savedData.totalBiaya || savedData.total || 0;
      totalEl.textContent = typeof totalAwal === 'number'
        ? 'Rp ' + totalAwal.toLocaleString('id-ID')
        : totalAwal;
    }

    form3.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!savedData.nama || !savedData.kendaraan) {
        alert('Data diri atau kendaraan belum lengkap. Silakan lengkapi dari halaman awal.');
        window.location.href = 'index.html';
        return;
      }

      const metode = document.getElementById('metode').value;
      const kodeBooking = 'RNT-' + Math.floor(100000 + Math.random() * 900000);

      const finalData = {
        ...savedData,
        metode,
        kodeBooking
      };

      localStorage.setItem('rentalData', JSON.stringify(finalData));
      window.location.href = 'hasil.html';
    });
  }

  const invKode = document.getElementById('inv-kode');
  if (invKode) {
    if (!savedData.kodeBooking) {
      alert('Belum ada transaksi yang diproses.');
      window.location.href = 'syarat.html';
      return;
    }

    const durasiTampil = savedData.durasi || savedData.lamaSewa || 1;
    const tambahanTampil = Array.isArray(savedData.tambahan)
      ? (savedData.tambahan.length > 0 ? savedData.tambahan.join(', ') : 'Tidak ada')
      : (savedData.tambahan || 'Tidak ada');

    let totalTampil = savedData.totalBiaya || savedData.total || 'Rp 0';
    if (typeof totalTampil === 'number') {
      totalTampil = 'Rp ' + totalTampil.toLocaleString('id-ID');
    }

    invKode.textContent = savedData.kodeBooking;
    document.getElementById('inv-nama').textContent = savedData.nama || '-';
    document.getElementById('inv-kontak').textContent = `${savedData.wa || '-'} / ${savedData.email || '-'}`;
    document.getElementById('inv-alamat').textContent = savedData.alamat || '-';
    document.getElementById('inv-unit').textContent = `${savedData.kendaraan || '-'} (${durasiTampil} Hari)`;
    document.getElementById('inv-tambahan').textContent = tambahanTampil;
    document.getElementById('inv-metode').textContent = savedData.metode || '-';
    document.getElementById('inv-total').textContent = totalTampil;

    const imgKtp = document.getElementById('inv-ktp');
    if (savedData.ktpImage) {
      imgKtp.src = savedData.ktpImage;
    } else {
      imgKtp.style.display = 'none';
    }

    document.getElementById('btn-selesai').addEventListener('click', () => {
      localStorage.removeItem('rentalData');
    });
  }
});
