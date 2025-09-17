import { openModal, closeModal } from "./modal.js"
import { openTime, addHour, subHour, addMinute, subMinute, normalizeTime } from "./timerPicker.js"
import { updateUI, nextStep } from "./updateUI.js"
import { load, save, eraseDay, checkStep } from "./storage.js"

// MODAL
const mark = document.querySelector('.mark')
mark.addEventListener('click', () => {
    openTime()
    openModal('clockIn')
    closeModal('clockIn')
})

// INPUTS
const hoursInput = document.querySelector('.time_hours')
const minutesInput = document.querySelector('.time_minutes')
let lastFocusedInput = hoursInput
hoursInput.addEventListener('focus', () => lastFocusedInput = hoursInput)
minutesInput.addEventListener('focus', () => lastFocusedInput = minutesInput)

// CONTROLES
const more = document.querySelector('.input_more')
const minus = document.querySelector('.input_minus')

more.addEventListener('click', () => {
    if (lastFocusedInput === hoursInput) addHour()
    if (lastFocusedInput === minutesInput) addMinute()
})

minus.addEventListener('click', () => {
    if (lastFocusedInput === hoursInput) subHour()
    if (lastFocusedInput === minutesInput) subMinute()
})

const normalize = () => {
    if (lastFocusedInput === hoursInput) normalizeTime('hours')
    if (lastFocusedInput === minutesInput) normalizeTime('minutes')
}
hoursInput.addEventListener('input', () => normalize())
minutesInput.addEventListener('input', () => normalize())

// INIT REGISTER MODAL
const submit = document.querySelector('.form_submit')
window.addEventListener('DOMContentLoaded', () => { 
    load()
    updateUI(checkStep())

    if (0) eraseDay() // use this to erase the day data (for testing purposes)
})

submit.addEventListener('click', () => {
    nextStep()
    save()
})