let siswa = [];

function tambahSiswa() {
    const nama = document.getElementById('nama').value;
    const kelas = document.getElementById('kelas').value;
    const mapel = document.getElementById('mapel').value;
    const nomor = document.getElementById('nomor').value;

    if (nama && kelas && mapel && nomor) {
        const siswaBaru = { nama, kelas, mapel, nomor };
        siswa.push(siswaBaru);
        tampilkanSiswa();
        bersihkanForm();
        simpanKeLocalStorage(); // Simpan ke localStorage setiap kali menambah siswa
    } else {
        alert('Harap Isi Semua Kolom!');
    }
    judul.innerHTML = "Pendaftaran Les Jenjang SMP";
}

function bersihkanForm() {
    judul.innerHTML = "Pendaftaran Les Jenjang SMP";
    document.getElementById('nama').value = '';
    document.getElementById('kelas').value = '';
    document.getElementById('mapel').value = '';
    document.getElementById('nomor').value = '';
    
    
}

function tampilkanSiswa(filteredSiswa = siswa) {
    const daftarSiswa = document.getElementById('daftar-list');
    daftarSiswa.innerHTML = '';

    filteredSiswa.forEach((murid, index) => {
        const itemSiswa = document.createElement('div');
        itemSiswa.classList.add('siswa-item');

        itemSiswa.innerHTML = `
            <p><strong>Nama:</strong> ${murid.nama}</p>
            <p><strong>Kelas:</strong> ${murid.kelas}</p>
            <p><strong>Mata Pelajaran:</strong> ${murid.mapel}</p>
            <p><strong>No.HP:</strong> ${murid.nomor}</p>
            <div class="tombol">
            <button class="editbtn" onclick="editSiswa(${index})">Edit</button>
            <button class="hapusbtn" onclick="hapusSiswa(${index})">Hapus</button>
            </div>`;

        daftarSiswa.appendChild(itemSiswa);
    });
}

function editSiswa(index) {
    judul.innerHTML = "Edit Pendaftaran"
    const murid = siswa[index];
    document.getElementById('nama').value = murid.nama;
    document.getElementById('kelas').value = murid.kelas;
    document.getElementById('mapel').value = murid.mapel;
    document.getElementById('nomor').value = murid.nomor;


    // Hapus siswa yang diubah dari array
    siswa.splice(index, 1);

    // Perbarui daftar yang ditampilkan
    tampilkanSiswa();

}


function hapusSiswa(index) {
    // Hapus siswa yang dipilih dari array
    const konfirmasi = confirm("Apakah Anda yakin ingin menghapus data ini ?");
    if (konfirmasi) {
        siswa.splice(index, 1);

        // Perbarui daftar yang ditampilkan
        tampilkanSiswa();
        simpanKeLocalStorage(); // Simpan ke localStorage setiap kali menghapus siswa
    }
}

function simpanKeLocalStorage() {
    // Simpan data siswa ke localStorage
    localStorage.setItem('siswa', JSON.stringify(siswa));
}

function muatDataDariLocalStorage() {
    // Muat data siswa dari localStorage pada awal
    const storedSiswa = localStorage.getItem('siswa');
    if (storedSiswa) {
        siswa = JSON.parse(storedSiswa);
    }

    // Tampilkan data awal
    tampilkanSiswa();
}

function searchInput() {
    const searchInputValue = document.getElementById("searchInput").value.toLowerCase();
    const filteredSiswa = siswa.filter(
        murid => murid.nama.toLowerCase().includes(searchInputValue) ||
            murid.kelas.toLowerCase().includes(searchInputValue) ||
            murid.mapel.toLowerCase().includes(searchInputValue) ||
            murid.nomor.toLowerCase().includes(searchInputValue)
    );
    tampilkanSiswa(filteredSiswa);
}

// Panggil fungsi untuk muat data dari localStorage
muatDataDariLocalStorage();
