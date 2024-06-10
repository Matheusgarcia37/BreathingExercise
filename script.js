document.getElementById('startButton').addEventListener('click', () => {
    const time = document.getElementById('time').value;
    startBreathingExercise(time);
});

function startBreathingExercise(minutes) {
    const totalSeconds = minutes * 60;
    let currentTime = totalSeconds;
    const breathingCircle = document.getElementById('breathingCircle');
    const timerDisplay = document.getElementById('timer');
    let isBreathingIn = true;

    const updateTimer = () => {
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;
        timerDisplay.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const breathe = () => {
        if (isBreathingIn) {
            breathingCircle.style.transform = 'scale(1.5)';
        } else {
            breathingCircle.style.transform = 'scale(0.1)'; // Quase desaparecendo durante a expiração
        }
        isBreathingIn = !isBreathingIn;
    };

    const breathingInterval = setInterval(breathe, 4000); // Alterna a cada 4 segundos
    const timerInterval = setInterval(() => {
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            clearInterval(breathingInterval);
            timerDisplay.textContent = 'Time left: 0:00';
            breathingCircle.style.transform = 'scale(1)';
            alert('Exercise complete!');
        } else {
            currentTime--;
            updateTimer();
        }
    }, 1000);

    updateTimer();
    breathe(); // Inicia a primeira respiração imediatamente
}
