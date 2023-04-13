let pomodoroTime = 25
let intervalSmallTime = 5
let intervalBigTime = 15
let totalSessions = 4
let autoStartIntervals = true

let seconds = pomodoroTime * 60

let pomodoroColor = "10, 135, 200"
let intervalSmallColor = "0, 120, 20"
let intervalBigColor = "100, 0, 190"

let tick
let session = 1
let isPomodoro = true
let isPlaying = false

updateDisplayTime()
updateDisplaySessions()
updateDisplaySettings()

$("#controlPause").hide()
$("#controlRestart").hide()
$("#button-settings").click(() => {
    $("#button-settings").toggleClass("selected")
    $("#ambienceSounds-root").toggleClass("hide")
    $("#div-settings").toggleClass("expand")
})
$("#controlPlay").click(() => play())
$("#controlPause").click(() => pause())
$("#controlRestart").click(() => restart())

$("#btPomodoroTimeMinus").click(() => {
    if (pomodoroTime > 60) pomodoroTime -= 10
    else if (pomodoroTime > 20) pomodoroTime -= 5
    else if (pomodoroTime > 1) pomodoroTime--
    updateDisplaySettings()
})

$("#btPomodoroTimePlus").click(() => {
    if (pomodoroTime < 20) pomodoroTime += 1
    else if (pomodoroTime < 60) pomodoroTime += 5
    else if (pomodoroTime < 120) pomodoroTime += 10
    updateDisplaySettings()
})

$("#btSmallIntervalTimeMinus").click(() => {
    if (intervalSmallTime > 60) intervalSmallTime -= 10
    else if (intervalSmallTime > 20) intervalSmallTime -= 5
    else if (intervalSmallTime > 1) intervalSmallTime--
    updateDisplaySettings()
})

$("#btSmallIntervalTimePlus").click(() => {
    if (intervalSmallTime < 20) intervalSmallTime += 1
    else if (intervalSmallTime < 60) intervalSmallTime += 5
    else if (intervalSmallTime < 120) intervalSmallTime += 10
    updateDisplaySettings()
})

$("#btBigIntervalTimeMinus").click(() => {
    if (intervalBigTime > 60) intervalBigTime -= 10
    else if (intervalBigTime > 20) intervalBigTime -= 5
    else if (intervalBigTime > 1) intervalBigTime--
    updateDisplaySettings()
})

$("#btBigIntervalTimePlus").click(() => {
    if (intervalBigTime < 20) intervalBigTime += 1
    else if (intervalBigTime < 60) intervalBigTime += 5
    else if (intervalBigTime < 120) intervalBigTime += 10
    updateDisplaySettings()
})

$("#btSessionMinus").click(() => {
    if (totalSessions > 1) totalSessions--
    updateDisplaySettings()
})

$("#btSessionPlus").click(() => {
    if (totalSessions < 20) totalSessions++
    updateDisplaySettings()
})

function play() {
    isPlaying = true
    clearInterval(tick)
    tick = setInterval(() => {
        if (seconds < 1) {
            endSession()
        } else {
            seconds--
            updateDisplayTime()
            $(".div-clock-intern").get(0).animate([
                { transform: 'scale(100%)' },
                { transform: 'scale(98%)' }
            ], {
                duration: 150,
                iterations: 2,
                direction: "alternate"
            });
        }
    }, 1000)
    $("#controlPlay").hide()
    $("#controlPause").show()
    $("#controlRestart").hide()
    $("#timerTitle").html(isPomodoro ? "Foco" : "Descanso")
}

function pause() {
    isPlaying = false
    clearInterval(tick)
    $("#controlPlay").show()
    $("#controlPause").hide()
    $("#controlRestart").show()
    $("#timerTitle").html("Pausado")
}

function restart() {
    isPlaying = false
    clearInterval(tick)
    if (session >= (totalSessions * 2)) {
        seconds = intervalBigTime * 60
        session = 2
    } else if (session % 2 == 0) seconds = intervalSmallTime * 60
    else seconds = pomodoroTime * 60
    updateDisplayTime()
    $("#controlPlay").show()
    $("#controlRestart").hide()
}

function endSession() {
    isPlaying = false
    clearInterval(tick)
    $("#controlPlay").show()
    $("#controlPause").hide()
    $("#controlRestart").hide()

    if (session > totalSessions) session = 1
    isPomodoro = !isPomodoro

    if (isPomodoro) {
        updateDisplayColor(pomodoroColor)
        seconds = pomodoroTime * 60
        if (session <= totalSessions) session++
    } else {
        if (session >= totalSessions) {
            seconds = intervalBigTime * 60
            updateDisplayColor(intervalBigColor)
        } else {
            seconds = intervalSmallTime * 60
            updateDisplayColor(intervalSmallColor)
        }
        if (autoStartIntervals) play()
    }

    updateDisplayTime()
    updateDisplaySessions()

    $("#timerTitle").html("Pronto")
    $("#notificationAudio").get(0).play()
}

function updateDisplayTime() {
    let min = Math.floor(seconds / 60)
    let sec = seconds % 60
    let time = min + ":" + (sec < 10 ? "0" : "") + sec
    $("#timerTime").html(time)
}

function updateDisplaySessions() {
    $("#sessionDisplay").empty()
    for (let i = 0; i < totalSessions; i++) {
        let isChecked = i + 1 < session ? "radio_button_checked" : "radio_button_unchecked"
        $("#sessionDisplay").append('<span class="material-symbols-rounded icon-small-nofill">' + isChecked + '</span>')
    }
}

function updateDisplayColor(color) {
    $(":root").css("--bg", color)
}

function updateDisplaySettings() {
    $("#labelPomodoroTime").html(pomodoroTime + "min")
    $("#labelSmallIntervalTime").html(intervalSmallTime + "min")
    $("#labelBigIntervalTime").html(intervalBigTime + "min")
    $("#labelSessionNumber").html("•".repeat(totalSessions))
    updateDisplayTime()
    updateDisplaySessions()
    if (!isPlaying) restart()
}