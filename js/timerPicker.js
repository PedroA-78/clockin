let hours, minutes

function format(valeu) {
    return `0${valeu}`.slice(-2)
}

function getTime(h, m) {
    // bug ao receber o número 0, ele considera como vazio e pega uma nova data
    hours = (h !== undefined && h !== null) ? h : new Date().getHours()
    minutes = (m !== undefined && m !== null) ? m : new Date().getMinutes()
}

export function openTime() {
    getTime()
    renderTime()
}

export function openMarkerTime(marker) {
    const time = marker.querySelector('.marker_hour').textContent.split(':')
    getTime(Number(time[0]), Number(time[1]))
    renderTime()
}

function renderTime() {
    const modal = document.querySelector('.modal.active')
    modal.querySelector('.time_hours').value = format(hours)
    modal.querySelector('.time_minutes').value = format(minutes)
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
    const modal = document.querySelector('.modal.active')
    const inputHours = modal.querySelector('.time_hours')
    const inputMinutes = modal.querySelector('.time_minutes')

    if (option === 'hours') {
        let value = parseInt(inputHours.value)
        if (value > 23) value = 0
        if (value < 0) value = 23
        if (isNaN(value)) value = 0

        hours = Number(value)
    }

    if (option === 'minutes') {
        let value = parseInt(inputMinutes.value)
        if (value > 59) value = 0
        if (value < 0) value = 59 
        if (isNaN(value)) value = 0

        minutes = Number(value)
    }

    renderTime()
}