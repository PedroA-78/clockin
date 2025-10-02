const steps = ['clock_in', 'interval_start', 'interval_end', 'clock_out']

export function save(date) {
    const markers = document.querySelectorAll('.marked')
    const data = JSON.parse(localStorage.getItem('clockin')) || {}
    const day = date

    if (!data[day]) data[day] = {}

    markers.forEach((marker, idx) => {
        const step = steps[idx]
        const time = marker.querySelector('.marker_hour').textContent
        data[day][step] = time
    })

    if (data[day]['clock_out']) {
        const workedHours = calculateWorkedHours(data, date)
        data[day]['worked_hours'] = workedHours
        
        const worked = document.querySelector('.worked')
        worked.querySelector('.marker_hour').textContent = workedHours
    }

    localStorage.setItem('clockin', JSON.stringify(data))
}

export function load(date) {
    const data = JSON.parse(localStorage.getItem('clockin')) || {}
    const day = date
    const markers = document.querySelectorAll('.marker')
    
    if (!data[day]) {
        markers.forEach(marker => { eraseMarker(marker) })
        document.querySelector('.worked .marker_hour').textContent = '--:--'
        return
    }

    markers.forEach((marker, idx) => {
        const step = steps[idx]
        if (!data[day][step]) {
            eraseMarker(marker)
            document.querySelector('.worked .marker_hour').textContent = '--:--'
            return
        }

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

export function checkStep(date) {
    const data = JSON.parse(localStorage.getItem('clockin')) || {}
    const day = date

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

function calculateWorkedHours(data, date) {
    const day = date

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

function format(value) {
    return `0${value}`.slice(-2)
}

function eraseMarker(marker) {
    marker.classList.remove('marked')
    marker.removeAttribute('data-step')
    marker.querySelector('.marker_icon').className = 'material-symbols-outlined marker_icon'
    marker.querySelector('.marker_hour').textContent = '--:--'
    marker.querySelector('.marker_register').classList.remove('visible')
}

export function eraseDay(date) {
    const data = JSON.parse(localStorage.getItem('clockin')) || {}
    const day = date

    if (data[day]) {
        delete data[day]
        localStorage.setItem('clockin', JSON.stringify(data))
    }
}