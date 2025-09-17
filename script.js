document.addEventListener('DOMContentLoaded', function() {
    // Masukkan kode konfigurasi Firebase Anda di sini
    const firebaseConfig = {
        apiKey: "API_KEY_ANDA",
        authDomain: "PROJECT_ID_ANDA.firebaseapp.com",
        databaseURL: "https://PROJECT_ID_ANDA.firebaseio.com",
        projectId: "PROJECT_ID_ANDA",
        storageBucket: "PROJECT_ID_ANDA.appspot.com",
        messagingSenderId: "SENDER_ID_ANDA",
        appId: "APP_ID_ANDA"
    };

    // Inisialisasi Firebase
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (error) {
        console.error("Firebase Initialization Error:", error);
        return; // Hentikan eksekusi jika ada kesalahan
    }
    
    // Dapatkan referensi ke database
    const database = firebase.database();
    const dataRef = database.ref('Data');

    // Referensi elemen HTML
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const monitoringScreen = document.getElementById('status-screen');

    // Fungsi untuk mengaktifkan pemantauan
    if (startBtn && welcomeScreen && monitoringScreen) {
        startBtn.addEventListener('click', function() {
            welcomeScreen.style.display = 'none';
            monitoringScreen.style.display = 'block';
        });
    } else {
        console.error("Salah satu elemen penting tidak ditemukan. Periksa ID HTML.");
    }

    // Fungsi untuk menghentikan pemantauan
    stopBtn.addEventListener('click', function() {
        welcomeScreen.style.display = 'block';
        monitoringScreen.style.display = 'none';
    });

    // Dengarkan perubahan data dari Firebase
    dataRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Memperbarui nilai pada elemen HTML
            const batteryLevelElement = document.getElementById('battery-level');
            const socPercent = document.getElementById('soc-percent');
            const statusBadge = document.getElementById('status-badge');
            const voltageValue = document.getElementById('voltage-value');
            const currentValue = document.getElementById('current-value');
            const powerValue = document.getElementById('power-value');
            const energyValue = document.getElementById('energy-value');
            const chargingTime = document.getElementById('charging-time');

            // Pastikan elemen ditemukan sebelum diperbarui
            if (batteryLevelElement && socPercent && statusBadge && voltageValue && currentValue && powerValue && energyValue && chargingTime) {
                // Update battery level
                if (data.SoC !== undefined) {
                    batteryLevelElement.style.height = data.SoC.toFixed(0) + '%';
                    socPercent.textContent = data.SoC.toFixed(0) + '%';
                }
                
                // Update status
                if (data.Status !== undefined) {
                    statusBadge.textContent = data.Status;
                    if (data.Status === "Charging") {
                        statusBadge.style.backgroundColor = "var(--success)";
                    } else if (data.Status === "Discharging") {
                        statusBadge.style.backgroundColor = "var(--danger)";
                    } else {
                        statusBadge.style.backgroundColor = "var(--warning)";
                    }
                }

                // Update stats
                voltageValue.textContent = (data.Voltage !== undefined ? data.Voltage.toFixed(2) : 0) + 'V';
                currentValue.textContent = (data.Current !== undefined ? data.Current.toFixed(2) : 0) + 'A';
                powerValue.textContent = (data.Power !== undefined ? data.Power.toFixed(2) : 0) + 'W';
                energyValue.textContent = (data.TotalEnergy !== undefined ? data.TotalEnergy.toFixed(2) : 0) + 'kWh';
                
                // Menghitung sisa waktu (perkiraan)
                const fullCapacityWh = 1000.0;
                const energyLeftWh = fullCapacityWh * (1 - (data.SoC !== undefined ? data.SoC / 100.0 : 0));
                
                if (data.Status === "Charging" && data.Power > 0) {
                    const timeRemainingHours = energyLeftWh / data.Power;
                    const timeRemainingMinutes = Math.round(timeRemainingHours * 60);
                    chargingTime.textContent = `Sisa Waktu: ${timeRemainingMinutes} menit`;
                } else if (data.Status === "Discharging") {
                    chargingTime.textContent = "Sedang Digunakan";
                } else {
                    chargingTime.textContent = "Siaga";
                }
            } else {
                console.error("Salah satu elemen pemantauan tidak ditemukan.");
            }
        } else {
            // Jika tidak ada data
            socPercent.textContent = "0%";
            statusBadge.textContent = "Tidak Ada Data";
            statusBadge.style.backgroundColor = "var(--warning)";
            voltageValue.textContent = "0V";
            currentValue.textContent = "0A";
            powerValue.textContent = "0W";
            energyValue.textContent = "0kWh";
            chargingTime.textContent = "Tidak Ada Data";
        }
    });
});
