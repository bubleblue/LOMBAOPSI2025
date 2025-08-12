// DOM Elements
        const welcomeScreen = document.getElementById('welcome-screen');
        const statusScreen = document.getElementById('status-screen');
        const startBtn = document.getElementById('start-btn');
        const stopBtn = document.getElementById('stop-btn');
        
        // Charging elements
        const batteryLevel = document.getElementById('battery-level');
        const batteryPercent = document.getElementById('battery-percent');
        const chargingTime = document.getElementById('charging-time');
        const voltageValue = document.getElementById('voltage-value');
        const currentValue = document.getElementById('current-value');
        const powerValue = document.getElementById('power-value');
        const energyValue = document.getElementById('energy-value');
        
        // Animation variables
        let chargingInterval;
        let currentProgress = 0;
        
        // Screen transitions
        function showScreen(screen) {
            [welcomeScreen, statusScreen].forEach(s => {
                s.classList.add('hidden');
                s.classList.remove('animate-in');
            });
            
            screen.classList.remove('hidden');
            screen.classList.add('animate-in');
            
            // Reset animations for elements within the screen
            const elements = screen.querySelectorAll('.animate-in');
            elements.forEach((el, index) => {
                el.style.animationDelay = `${index * 0.1}s`;
            });
        }
        
        // Start charging simulation
        function startCharging() {
            clearInterval(chargingInterval);
            currentProgress = 0;
            updateChargingDisplay(0);
            
            chargingInterval = setInterval(() => {
                if (currentProgress >= 100) {
                    clearInterval(chargingInterval);
                    batteryLevel.style.background = 'linear-gradient(to top, var(--success), #7CFFB3)';
                    return;
                }
                
                currentProgress += 1;
                updateChargingDisplay(currentProgress);
            }, 100);
        }
        
        // Update all charging display elements
        function updateChargingDisplay(progress) {
            // Battery display
            batteryLevel.style.height = `${progress}%`;
            batteryPercent.textContent = `${progress}%`;
            
            // Calculate time remaining (simplified)
            const minsRemaining = Math.floor((100 - progress) * 0.3);
            const hours = Math.floor(minsRemaining / 60);
            const mins = minsRemaining % 60;
            
            if (hours > 0) {
                chargingTime.textContent = `${hours}h ${mins}m remaining`;
            } else {
                chargingTime.textContent = `${mins}m remaining`;
            }
            
            // Update stats (simulated values)
            voltageValue.textContent = `${220 + Math.floor(progress / 10)}V`;
            currentValue.textContent = `${900 - Math.floor(progress / 5)}A`;
            powerValue.textContent = `${500 + progress * 2}W`;
            energyValue.textContent = `${(progress / 20).toFixed(1)}kWh`;
            
            // Change battery color based on charge level
            if (progress > 90) {
                batteryLevel.style.background = 'linear-gradient(to top, var(--success), #7CFFB3)';
            } else if (progress > 75) {
                batteryLevel.style.background = 'linear-gradient(to top, #64DD17, #B2FF59)';
            } else {
                batteryLevel.style.background = 'linear-gradient(to top, var(--primary), #66B3FF)';
            }
        }
        
        // Stop charging
        function stopCharging() {
            clearInterval(chargingInterval);
            showScreen(welcomeScreen);
        }
        
        // Event listeners
        startBtn.addEventListener('click', () => {
            showScreen(statusScreen);
            startCharging();
        });
        
        stopBtn.addEventListener('click', stopCharging);
        
        // Initialize
        showScreen(welcomeScreen);