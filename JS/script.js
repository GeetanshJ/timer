var resume_pause = document.querySelector("#resume-pause");
var start = document.querySelector("#start");
var showTime = document.querySelector("#showTime");
var reset = document.querySelector("#reset");
var progressBar = document.querySelector("#progress");
var globalTime = 0
var isStart = false;
var minTime = document.querySelectorAll(".time-btn")

minTime.forEach((e) => {
    e.addEventListener("click", () => {
        let selectTime = new Audio("./AUDIOS/time_select.wav");
        selectTime.play();
        globalTime = e.value
        displayTime(globalTime, 0)
    })
})

var pauseInterval = null;
var timeInterval = null;
var timeLeft = 0;
var totalTime = 0;

start.addEventListener("click", () => {
    if (showTime.textContent !== "00:00") {
        let startAudio = new Audio("./AUDIOS/task_start.wav");
        startAudio.play();
        isStart = true
        displayTime(globalTime, 1)
    }

    else {
        alert("select time");
    }
});

resume_pause.addEventListener("click", () => {
    if (showTime.textContent !== "00:00" && isStart) {
        if (resume_pause.textContent === "Pause") {
            resume_pause.textContent = "Resume";
            let alarmAudio = new Audio("./AUDIOS/task_alarm.wav");
            pauseInterval = setInterval(() => {
                alarmAudio.play();
            }, 500);
            clearInterval(timeInterval);
        }

        else {
            resume_pause.textContent = "Pause";
            clearInterval(pauseInterval);
            timeInterval = setInterval(updateTime, 1000);
        }
    }

    else {
        alert("time not started");
    }
});


reset.addEventListener(("click"), () => {
    let resetAudio = new Audio("./AUDIOS/task_reset.wav");
    resetAudio.play()
})

function resetTask() {

    showTime.textContent = "00:00";
    timeLeft = 0;
    totalTime = 1;
    updateDisplay()
    clearInterval(timeInterval)
    clearInterval(pauseInterval)
}

function displayTime(min, check) {
    resetTask();
    timeLeft = min * 60;
    totalTime = min * 60;
    updateDisplay();

    if (check == 1) timeInterval = setInterval(updateTime, 1000);
}

function updateTime() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    }

    else {
        let taskFinish = new Audio("./AUDIOS/task_finish.wav");
        taskFinish.play();
        resetTask()
    }
}

function updateDisplay() {
    let minLeft = Math.floor(timeLeft / 60);
    let secLeft = timeLeft % 60;
    showTime.textContent = `${minLeft < 10 ? '0' + minLeft : minLeft}:${secLeft < 10 ? '0' + secLeft : secLeft}`;
    let width = (timeLeft / totalTime) * 100
    progressBar.style.width = `${width}%`
}
