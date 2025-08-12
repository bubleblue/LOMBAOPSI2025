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
