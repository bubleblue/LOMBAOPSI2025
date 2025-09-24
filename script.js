
        document.addEventListener('DOMContentLoaded', function() {
            // Masukkan kode konfigurasi Firebase Anda di sini
            const firebaseConfig = {
                apiKey: "AIzaSyAynKRFmVNUFFU5e8cbN_iC6yYdcdUmdv4",
                authDomain: "lombaopsi2025.firebaseapp.com",
                databaseURL: "https://lombaopsi2025-default-rtdb.firebaseio.com/",
                projectId: "lombaopsi2025",
                storageBucket: "lombaopsi2025.firebasestorage.app",
                messagingSenderId: "1046202656318",
                appId: "1:1046202656318:web:81afdf15e58ee3bb62536f"
            };

            // Inisialisasi Firebase
            try {
                firebase.initializeApp(firebaseConfig);
            } catch (error) {
                console.error("Firebase Initialization Error:", error);
            }
            
            // Dapatkan referensi ke database
            const database = firebase.database();
            const dataRef = database.ref('Data');

            // Referensi elemen HTML
            const startBtn = document.getElementById('start-btn');
            const stopBtn = document.getElementById('stop-btn');
            const welcomeScreen = document.getElementById('welcome-screen');
            const monitoringScreen = document.getElementById('status-screen');

            const batteryLevelElement = document.getElementById('battery-level');
            const socPercent = document.getElementById('soc-percent');
            const statusBadge = document.getElementById('status-badge');
            const voltageValue = document.getElementById('voltage-value');
            const currentValue = document.getElementById('current-value');
            const powerValue = document.getElementById('power-value');
            const energyValue = document.getElementById('energy-value');
            const chargingTime = document.getElementById('charging-time');

            // Fungsi untuk mengaktifkan pemantauan saat tombol "Start" diklik
            startBtn.addEventListener('click', function() {
                welcomeScreen.classList.remove('active');
                monitoringScreen.classList.add('active');
            });

            // Fungsi untuk menghentikan pemantauan saat tombol "Stop" diklik
            stopBtn.addEventListener('click', function() {
                monitoringScreen.classList.remove('active');
                welcomeScreen.classList.add('active');
            });

            // Dengarkan perubahan data dari Firebase
            dataRef.on('value', (snapshot) => {
                const data = snapshot.val();
                
                if (data) {
                    // Update battery level dan warna
                    if (data.SoC !== undefined) {
                        batteryLevelElement.style.height = data.SoC.toFixed(0) + '%';
                        socPercent.textContent = data.SoC.toFixed(0) + '%';
                        
                        if (data.SoC <= 20) {
                            batteryLevelElement.style.background = 'linear-gradient(to top, var(--danger-color), #FF7979)';
                        } else if (data.SoC < 100) {
                            batteryLevelElement.style.background = 'linear-gradient(to top, var(--success-color), #7CFFB3)';
                        } else {
                            batteryLevelElement.style.background = 'linear-gradient(to top, var(--primary-color), #7CFFB3)';
                        }
                    }
                    
                    // Update status
                    if (data.Status !== undefined) {
                        statusBadge.textContent = data.Status;
                        if (data.Status === "Charging") {
                            statusBadge.style.backgroundColor = "var(--success-color)";
                        } else if (data.Status === "Discharging") {
                            statusBadge.style.backgroundColor = "var(--danger-color)";
                        } else {
                            statusBadge.style.backgroundColor = "var(--warning-color)";
                        }
                    }

                    // Update nilai-nilai statistik
                    voltageValue.textContent = (data.Voltage !== undefined ? data.Voltage.toFixed(2) : 0) + 'V';
                    currentValue.textContent = (data.Current !== undefined ? data.Current.toFixed(2) : 0) + 'A';
                    powerValue.textContent = (data.Power !== undefined ? data.Power.toFixed(2) : 0) + 'W';
                    energyValue.textContent = (data.TotalEnergy !== undefined ? data.TotalEnergy.toFixed(2) : 0) + 'kWh';
                    
                    const fullCapacityWh = 1000.0;
                    const energyLeftWh = fullCapacityWh * (1 - (data.SoC !== undefined ? data.SoC / 100.0 : 0));
                    
                    // Logika perhitungan sisa waktu yang lebih baik
                    if (data.SoC >= 100) {
                        chargingTime.textContent = "Baterai Penuh";
                    } else if (data.Status === "Charging" && data.Power > 1) {
                        const timeRemainingHours = energyLeftWh / data.Power;
                        const timeRemainingMinutes = Math.round(timeRemainingHours * 60);
                        chargingTime.textContent = `Sisa Waktu: ${timeRemainingMinutes} menit`;
                    } else if (data.Status === "Discharging") {
                        chargingTime.textContent = "Sedang Digunakan";
                    } else {
                        chargingTime.textContent = "Siaga";
                    }
                } else {
                    // Jika tidak ada data
                    socPercent.textContent = "0%";
                    statusBadge.textContent = "Tidak Ada Data";
                    statusBadge.style.backgroundColor = "var(--warning-color)";
                    voltageValue.textContent = "0V";
                    currentValue.textContent = "0A";
                    powerValue.textContent = "0W";
                    energyValue.textContent = "0kWh";
                    chargingTime.textContent = "Tidak Ada Data";
                }
            });
        });
