var resume_pause = document.querySelector("#resume-pause");
var start = document.querySelector("#start");
var showTime = document.querySelector("#showTime");
var reset = document.querySelector("#reset");
var progressBar = document.querySelector("#progress");
var task_break = document.querySelector(".task-break");
var globalTime = 0
var isStart = false;
var pauseInterval = null;
var timeInterval = null;
var timeLeft = 0;
var totalTime = 0;
var taskTime = document.querySelectorAll(".time-btn")
var breakTime = document.querySelectorAll(".break-btn")
var titleOfTask = document.querySelector(".task-break")

taskTime.forEach((e) => {
    e.addEventListener("click", () => {
        globalTime = e.value
        isStart = false
        titleOfTask.textContent = "Task Time"
        displayTime(globalTime, 0)
    })
})

start.addEventListener("click", () => {
    if (showTime.textContent !== "00:00:00") {
        isStart = true
        displayTime(globalTime, 1)
    }

    else {
        alert("select time");
    }
});

breakTime.forEach((e) => {
    e.addEventListener("click", () => {
        globalTime = e.value
        isStart = false
        titleOfTask.textContent = "Break Time"

        displayTime(globalTime, 0)
    })
})



resume_pause.addEventListener("click", () => {
    if (showTime.textContent !== "00:00:00" && isStart) {
        if (resume_pause.textContent === "Pause") {
            resume_pause.textContent = "Resume";
            pauseInterval = setInterval(() => {
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
})

function resetTask() {

    showTime.textContent = "00:00:00";
    timeLeft = 0;
    totalTime = 1;
    updateDisplay()
    clearInterval(timeInterval)
    clearInterval(pauseInterval)
    resume_pause.textContent = "Pause"
}

function displayTime(time, check) {
    resetTask();
    timeLeft = time*60*60;
    totalTime = time*60*60;
    updateDisplay();

    if (check == 1) timeInterval = setInterval(updateTime, 1000);
}

function updateTime() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    }

    else {
        resetTask()
    }
}

function updateDisplay() {
    let hrsLeft = Math.floor(timeLeft / 3600);
    let minLeft = Math.floor(Math.floor(timeLeft % 3600) / 60);
    let secLeft = timeLeft % 60;
    showTime.textContent = `${hrsLeft < 10 ? '0' + hrsLeft : hrsLeft}:${minLeft < 10 ? '0' + minLeft : minLeft}:${secLeft < 10 ? '0' + secLeft : secLeft}`;
    let width = (timeLeft / totalTime) * 100
    progressBar.style.width = `${width}%`
}