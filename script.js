document.getElementById('start-btn').addEventListener('click', function() {
            document.getElementById('welcome-screen').classList.add('hidden');
            document.getElementById('status-screen').classList.remove('hidden');
            
            // Simulate charging animation
            let batteryLevel = 0;
            const batteryElement = document.getElementById('battery-level');
            const batteryPercent = document.getElementById('battery-percent');
            const chargingTime = document.getElementById('charging-time');
            
            const interval = setInterval(function() {
                batteryLevel += 1;
                batteryElement.style.height = batteryLevel + '%';
                batteryPercent.textContent = batteryLevel + '%';
                
                // Update time remaining
                const remaining = 100 - batteryLevel;
                chargingTime.textContent = remaining + ' minutes remaining';
                
                if (batteryLevel >= 100) {
                    clearInterval(interval);
                    batteryLevel = 100;
                    batteryElement.style.height = '100%';
                    batteryPercent.textContent = '100%';
                    chargingTime.textContent = 'Charging complete!';
                }
            }, 1000);
            
            // Stop charging when button clicked
            document.getElementById('stop-btn').addEventListener('click', function() {
                clearInterval(interval);
                document.getElementById('status-screen').classList.add('hidden');
                document.getElementById('welcome-screen').classList.remove('hidden');
            });
        });

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

        // Referensi elemen HTML
        const voltageElement = document.getElementById('voltage');
        const currentElement = document.getElementById('current');
        const powerElement = document.getElementById('power');
        const energyElement = document.getElementById('total-energy');

        // Dengarkan perubahan data
        dataRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Perbarui teks pada elemen HTML
                voltageElement.textContent = data.Voltage.toFixed(2);
                currentElement.textContent = data.Current.toFixed(2);
                powerElement.textContent = data.Power.toFixed(2);
                energyElement.textContent = data.TotalEnergy.toFixed(2);
            } else {
                voltageElement.textContent = "Tidak ada data";
                currentElement.textContent = "Tidak ada data";
                powerElement.textContent = "Tidak ada data";
                energyElement.textContent = "Tidak ada data";
            }
        });

