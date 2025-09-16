// Masukkan kode konfigurasi Firebase Anda di sini
// Contoh: const firebaseConfig = { ... };
const firebaseConfig = {
    /* GANTI DENGAN KODE KONFIGURASI FIREBASE ANDA */
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
    
// Dapatkan referensi ke database
const database = firebase.database();
const dataRef = database.ref('Data');

// Referensi elemen HTML baru dan lama
const socElement = document.getElementById('soc');
const statusElement = document.getElementById('status');
const voltageElement = document.getElementById('voltage');
const currentElement = document.getElementById('current');
const powerElement = document.getElementById('power');
const energyElement = document.getElementById('total-energy');
const batteryLevelElement = document.getElementById('battery-level');

// Dengarkan perubahan data
dataRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Perbarui teks dan gaya pada elemen HTML
        // Memperbarui SoC dan status baterai
        socElement.textContent = data.SoC.toFixed(0) + "%";
        statusElement.textContent = data.Status;
        batteryLevelElement.style.height = data.SoC.toFixed(0) + "%";
        
        // Memperbarui data lainnya
        voltageElement.textContent = data.Voltage.toFixed(2);
        currentElement.textContent = data.Current.toFixed(2);
        powerElement.textContent = data.Power.toFixed(2);
        energyElement.textContent = data.TotalEnergy.toFixed(2);
    } else {
        // Jika tidak ada data
        socElement.textContent = "Tidak ada data";
        statusElement.textContent = "Tidak ada data";
        voltageElement.textContent = "Tidak ada data";
        currentElement.textContent = "Tidak ada data";
        powerElement.textContent = "Tidak ada data";
        energyElement.textContent = "Tidak ada data";
    }
});
