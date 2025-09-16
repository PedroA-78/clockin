const steps = ['clock_in', 'interval_start', 'interval_end', 'clock_out']

export function save() {
    const markers = document.querySelectorAll('.marked')
    const data = JSON.parse(localStorage.getItem('clockin')) || {}
    const day = getDay()

    if (!data[day]) data[day] = {}

    markers.forEach((marker, idx) => {
        const step = steps[idx]
        const time = marker.querySelector('.marker_hour').textContent
        data[day][step] = time
    })

    localStorage.setItem('clockin', JSON.stringify(data))
}

export function load() {
    const data = JSON.parse(localStorage.getItem('clockin')) || {}
    const day = getDay()

    if (!data[day]) return

    const markers = document.querySelectorAll('.marker')
    markers.forEach((marker, idx) => {
        const step = steps[idx]
        marker.classList.add('marked')
        marker.querySelector('.marker_icon').classList.add(step)
        marker.querySelector('.marker_hour').textContent = data[day][step]
    })
}

function getDay() {
    const date = new Date()
    return `${date.getFullYear()}-${format(date.getMonth()+1)}-${format(date.getDate())}`
}

function format(value) {
    return `0${value}`.slice(-2)
}