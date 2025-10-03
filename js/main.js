import { openModal } from "./modal.js"
import { setupMenu } from "./menu.js"
import { openTime, openMarkerTime, addHour, subHour, addMinute, subMinute, normalizeTime } from "./timerPicker.js"
import { updateUI, nextStep } from "./updateUI.js"
import { load, save, eraseDay, checkStep, getWorkedDays } from "./storage.js"
import { generateCalendar, markDayAsFinished, monthControl, setActiveDay, getActiveDate } from "./calendar.js"
import { setupBackups } from "./backup.js"

window.addEventListener('DOMContentLoaded', () => {
    // AUX. FUNCTIONS (AX)

    let hoursInput, minutesInput, lastFocusedInput, selectedStep

    // AX - GLOBAL CONTROLS INPUT
    document.body.addEventListener('click', (e) => {
        const modal = document.querySelector('.modal.active')
        if (!modal) return

        // + BUTTON
        if (e.target.closest('.input_more')) { 
            if (lastFocusedInput === hoursInput) addHour()
            if (lastFocusedInput === minutesInput) addMinute()
        }

        // - BUTTON
        if (e.target.closest('.input_minus')) {
            if (lastFocusedInput === hoursInput) subHour()
            if (lastFocusedInput === minutesInput) subMinute()
        }

        // SUBMIT BUTTON
        if (e.target.closest('.form_submit')) {
            nextStep()
            save(getActiveDate())
        }
    })

    const setModalControls = () => {
        const modal = document.querySelector('.modal.active')
        if (!modal) return

        hoursInput = modal.querySelector('.time_hours')
        minutesInput = modal.querySelector('.time_minutes')
        lastFocusedInput = hoursInput


        // AX = INPUT
        hoursInput?.addEventListener('focus', () => lastFocusedInput = hoursInput)
        hoursInput?.addEventListener('input', () => normalize())

        minutesInput?.addEventListener('focus', () => lastFocusedInput = minutesInput)
        minutesInput?.addEventListener('input', () => normalize())
    }

    const normalize = () => {
        if (lastFocusedInput === hoursInput) normalizeTime('hours')
        if (lastFocusedInput === minutesInput) normalizeTime('minutes')
    }



    // INIT PAGE
    load(getActiveDate())
    setupMenu()
    setupBackups()
    // eraseDay() // use this to erase the day data (for testing purposes)
    
    generateCalendar()
    markDayAsFinished(getWorkedDays())

    // CALENDAR (CL)

    // CL = SELETORS
    const monthControls = document.querySelectorAll('[data-action]')

    // CL - OPEN
    monthControls.forEach(button => { 
        button.addEventListener('click', () => {
            monthControl(button.dataset.action)
            markDayAsFinished(getWorkedDays())
        })
    })

    document.body.addEventListener('click', (e) => {
        const calendar = e.target.closest('.calendar_days')
        const days = calendar?.querySelectorAll('.current_month')
        const day = e.target.closest('.current_month')

        days?.forEach(elemDay => { elemDay.classList.toggle('active', elemDay === day ) });

        if (day) {
            setActiveDay(day.querySelector('.day_number').textContent)
            load(getActiveDate())
        }
    })



    // REGISTERS MODAL (RM)

    // RM - SELETORS
    const mark = document.querySelector('.mark')

    // RM - OPEN
    mark?.addEventListener('click', () => {
        openModal('clockIn')
        openTime()
        updateUI(checkStep(getActiveDate()))
        setModalControls()
    })

    // EDIT REGISTER MODAL (EM)

    // EM - OPEN
    document.body.addEventListener('click', (e) => {
        const marked = e.target.closest('.marked')
        if (!marked) return

        selectedStep = marked.dataset.step
        openModal('editRegister')
        openMarkerTime(marked)
        updateUI(selectedStep)
        setModalControls()
    })

})

