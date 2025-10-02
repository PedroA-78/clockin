const calendar = document.querySelector(".calendar_days");

let activeDate = new Date()
let activeMonth = activeDate.getMonth() + 1
let activeYear = activeDate.getFullYear()
let activeDay = activeDate.getDate()

export function generateCalendar() {
    const date = new Date(activeYear, activeMonth, 0)

    const weekdays = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const weekdayOfFirstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const weekdayOfLastDay = new Date(date.getFullYear(), date.getMonth(), daysInMonth).getDay();

    calendar.innerHTML = ""; // Clear existing days

    // Add empty days for the previous month
    previousMonthDays(weekdayOfFirstDay, date);

    for (let i = 1; i <= daysInMonth; i++) {
        const day = dayElement();
        day.classList.add("current_month");
        if (`${activeDate.getFullYear()}-${activeDate.getMonth() + 1}-${activeDate.getDate()}` === `${activeYear}-${activeMonth}-${i}`) day.classList.add('crrDay', 'active')
        day.querySelector(".day_number").textContent = i;
        
        calendar.appendChild(day);
    }

    nextMonthDays(weekdayOfLastDay);

    document.querySelector('.calendar_month').textContent = date.toLocaleDateString('pt-BR', {month: 'long', year: 'numeric'})
}

export function markDayAsFinished(workedDays) {
    const currentMonth = activeMonth;
    const currentYear = activeYear;

    const days = document.querySelectorAll(".current_month");
    days.forEach((dayElem) => {
        const dayNumberElem = dayElem.querySelector(".day_number")
        const formattedDate = `${currentYear}-${formatDate(currentMonth)}-${formatDate(dayNumberElem?.textContent)}`

        if (workedDays[formattedDate]) {
            const day_worked_hours = document.createElement("p");
            const day_finished_icon = document.createElement("span");

            day_worked_hours.className = "day_worked_hours finished";
            day_worked_hours.textContent = workedDays[formattedDate]

            day_finished_icon.className = "material-symbols-outlined day_finished_icon finished";
            day_finished_icon.textContent = "task_alt";

            dayElem.appendChild(day_worked_hours)
            dayElem.appendChild(day_finished_icon)
            dayNumberElem?.classList.add("finished")
        }
    })
}

export function monthControl(action) {
    if (action === "previous") {
        activeMonth--
        if (activeMonth < 1) {
            activeMonth = 12
            activeYear--
        }
    }

    if (action === "next") {
        activeMonth++
        if (activeMonth > 12) {
            activeMonth = 1
            activeYear++
        }
    }

    generateCalendar()
}

export function setActiveDay(day) {
    activeDay = Number(day)
}

export function getActiveDate() {
    return `${activeYear}-${formatDate(activeMonth)}-${formatDate(activeDay)}`
}

function dayElement() {
    const day = document.createElement("div");
    const day_number = document.createElement("p");
    day.className = "day";
    day_number.className = "day_number";

    day.appendChild(day_number);

    return day;
}

function formatDate(value) {
    return `0${value}`.slice(-2);
}

function previousMonthDays(firstDay, date) {
    if (firstDay > 0) {
        const previousMonthDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        for (let i = (previousMonthDays - firstDay + 1); i <= previousMonthDays ; i++) {
            const day = dayElement();
            day.classList.add("previous_month");
            day.querySelector(".day_number").textContent = i;

            calendar.appendChild(day);
        }
    }
}

function nextMonthDays(lastDay) {
    if (lastDay < 6) {
        for (let i = 1; i <= (6 - lastDay); i++) {
            const day = dayElement();
            day.classList.add("next_month");
            day.querySelector(".day_number").textContent = i;

            calendar.appendChild(day);
        }
    }
}