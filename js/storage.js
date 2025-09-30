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

    if (data[day]['clock_out']) {
        const workedHours = calculateWorkedHours(data)
        data[day]['worked_hours'] = workedHours
        
        const worked = document.querySelector('.worked')
        worked.querySelector('.marker_hour').textContent = workedHours
    }

    localStorage.setItem('clockin', JSON.stringify(data))
}

export function load() {
    const data = JSON.parse(localStorage.getItem('clockin')) || {}
    const day = getDay()

    if (!data[day]) return

    const markers = document.querySelectorAll('.marker')
    markers.forEach((marker, idx) => {
        const step = steps[idx]
        if (!data[day][step]) return

        marker.classList.add('marked')
        marker.setAttribute('data-step', idx)
        marker.querySelector('.marker_icon').classList.add(step)
        marker.querySelector('.marker_hour').textContent = data[day][step]
        marker.querySelector('.marker_register').classList.add('visible')
    })

    if (data[day]['clock_out']) {
        const worked = document.querySelector('.worked')
        const workedHours = data[day]['worked_hours']
        worked.querySelector('.marker_hour').textContent = workedHours
    }
}

export function checkStep() {
    const data = JSON.parse(localStorage.getItem('clockin')) || {}
    const day = getDay()

    if (!data[day]) return

    for (let i = 0; i < steps.length; i++) {
        if (!data[day][steps[i]]) return i
    }

    return -1
}

export function getWorkedDays() {
    const data = JSON.parse(localStorage.getItem('clockin')) || {}
    let workedDays = {}

    Object.keys(data).forEach(day => {
        if (data[day]['worked_hours']) workedDays[day] = data[day]['worked_hours']
    })

    return workedDays

}

function calculateWorkedHours(d) {
    const data = d
    const day = getDay()

    if (!data[day]) return
    if (!data[day]['clock_out']) return


    function toMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number)
        return hours * 60 + minutes
    }

    const clockIn = toMinutes(data[day]['clock_in'])
    const clockOut = toMinutes(data[day]['clock_out'])
    const interval = toMinutes(data[day]['interval_end']) - toMinutes(data[day]['interval_start'])


    const workerHours = (clockOut - clockIn) - interval
    const hours = Math.floor(workerHours / 60)
    const minutes = workerHours % 60

    return `${format(hours)}:${format(minutes)}`
}

function getDay() {
    const date = new Date()
    return `${date.getFullYear()}-${format(date.getMonth()+1)}-${format(date.getDate())}`
}

function format(value) {
    return `0${value}`.slice(-2)
}

export function eraseDay() {
    const data = JSON.parse(localStorage.getItem('clockin')) || {}
    const day = getDay()

    if (data[day]) {
        delete data[day]
        localStorage.setItem('clockin', JSON.stringify(data))
    }
}