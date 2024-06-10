document.getElementById('startButton').addEventListener('click', () => {
    const time = document.getElementById('time').value;
    startBreathingExercise(time);
});

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

let totalSessions = parseInt(localStorage.getItem('totalSessions')) || 0;
let totalTime = parseInt(localStorage.getItem('totalTime')) || 0;

document.getElementById('totalSessions').textContent = `Total Sessions: ${totalSessions}`;
document.getElementById('totalTime').textContent = `Total Time: ${totalTime} minutes`;

const inhaleSound = document.getElementById('inhaleSound');
const exhaleSound = document.getElementById('exhaleSound');

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
            inhaleSound.play();
            exhaleSound.pause();
            exhaleSound.currentTime = 0;
            breathingCircle.style.transform = 'scale(1.5)';
        } else {
            exhaleSound.play();
            inhaleSound.pause();
            inhaleSound.currentTime = 0;
            breathingCircle.style.transform = 'scale(0.1)';
        }
        isBreathingIn = !isBreathingIn;
    };

    const endSession = () => {
        totalSessions++;
        totalTime += parseInt(document.getElementById('time').value);
        localStorage.setItem('totalSessions', totalSessions);
        localStorage.setItem('totalTime', totalTime);
        document.getElementById('totalSessions').textContent = `Total Sessions: ${totalSessions}`;
        document.getElementById('totalTime').textContent = `Total Time: ${totalTime} minutes`;
        alert('Exercise complete!');
    };

    const breathingInterval = setInterval(breathe, 4000); // Alterna a cada 4 segundos
    const timerInterval = setInterval(() => {
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            clearInterval(breathingInterval);
            timerDisplay.textContent = 'Time left: 0:00';
            breathingCircle.style.transform = 'scale(1)';
            endSession();
        } else {
            currentTime--;
            updateTimer();
        }
    }, 1000);

    updateTimer();
    breathe(); // Inicia a primeira respiração imediatamente
}
