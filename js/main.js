import { openModal } from "./modal.js"
import { setupMenu } from "./menu.js"
import { openTime, addHour, subHour, addMinute, subMinute, normalizeTime } from "./timerPicker.js"
import { updateUI, nextStep } from "./updateUI.js"
import { load, save, eraseDay, checkStep, getWorkedDays } from "./storage.js"
import { generateCalendar, markDayAsFinished, monthControl } from "./calendar.js"

window.addEventListener('DOMContentLoaded', () => {
    // INIT PAGE
    load()
    updateUI(checkStep())
    setupMenu()
    // eraseDay() // use this to erase the day data (for testing purposes)

    generateCalendar()
    markDayAsFinished(getWorkedDays())

    // CALENDAR (CL)

    // CL = SELETORS
    const monthControls = document.querySelectorAll('[data-action]')
    monthControls.forEach(button => { 
        button.addEventListener('click', () => {
            monthControl(button.dataset.action)
            markDayAsFinished(getWorkedDays())
        })
    })



    // REGISTERS MODAL (RM)

    // RM - SELETORS
    const mark = document.querySelector('.mark')
    const more = document.querySelector('.input_more')
    const minus = document.querySelector('.input_minus')
    const hoursInput = document.querySelector('.time_hours')
    const minutesInput = document.querySelector('.time_minutes')
    let lastFocusedInput = hoursInput
    const submit = document.querySelector('.form_submit')

    
    const normalize = () => {
        if (lastFocusedInput === hoursInput) normalizeTime('hours')
        if (lastFocusedInput === minutesInput) normalizeTime('minutes')
    }

    // RM - OPEN
    mark?.addEventListener('click', () => {
        openTime()
        openModal('clockIn')
    })

    // RM - CONTROLS
    more?.addEventListener('click', () => {
        if (lastFocusedInput === hoursInput) addHour()
        if (lastFocusedInput === minutesInput) addMinute()
    })

    minus?.addEventListener('click', () => {
        if (lastFocusedInput === hoursInput) subHour()
        if (lastFocusedInput === minutesInput) subMinute()
    })

    // RM - INPUTS
    hoursInput?.addEventListener('focus', () => lastFocusedInput = hoursInput)
    hoursInput?.addEventListener('input', () => normalize())

    minutesInput?.addEventListener('focus', () => lastFocusedInput = minutesInput)
    minutesInput?.addEventListener('input', () => normalize())

    // RM - SUBMIT
    submit?.addEventListener('click', () => {
        nextStep()
        save()
    })

})

