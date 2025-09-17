let hours, minutes

function format(valeu) {
    return `0${valeu}`.slice(-2)
}

function getTime() {
    hours = new Date().getHours()
    minutes = new Date().getMinutes()
}

export function openTime() {
    getTime()
    renderTime()
}

function renderTime() {
    document.querySelector('.time_hours').value = format(hours)
    document.querySelector('.time_minutes').value = format(minutes)
}

export function addHour() {
    hours = (hours + 1) % 24
    renderTime()
}

export function subHour() {
    hours = (hours - 1 + 24) % 24
    renderTime()
}


export function addMinute() {
    minutes = (minutes + 1) % 60
    renderTime()
}

export function subMinute() {
    minutes = (minutes - 1 + 60) % 60
    renderTime()
}

export function normalizeTime(option) {
    const inputHours = document.querySelector('.time_hours')
    const inputMinutes = document.querySelector('.time_minutes')

    if (option === 'hours') {
        let value = parseInt(inputHours.value)
        if (value > 23) value = 0
        if (value < 0) value = 23

        hours = Number(value)
    }

    if (option === 'minutes') {
        let value = parseInt(inputMinutes.value)
        if (value > 59) value = 0
        if (value < 0) value = 59 

        minutes = Number(value)
    }

    renderTime()
}