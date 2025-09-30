const steps = [
    {
        id: 0,
        key: "clock_in",
        label: "Entrada",
        icon: "arrow_downward",
        subtext: "Iniciar expediente"
    },
    { 
        id: 1,
        key: "interval_start",
        label: "Saída para o intervalo",
        icon: "restaurant", 
        subtext: "Pausa para almoço"
    },
    { 
        id: 2,
        key: "interval_end",
        label: "Volta do Intervalo",
        icon: "restaurant", 
        subtext: "Retomar expediente"
    },
    { 
        id: 3,
        key: "clock_out",
        label: "Saída",
        icon: "arrow_upward",
        subtext: "Encerrar expediente"
    }
]

let currentStep = 0 // começa no primeiro
let step = steps[currentStep]

export function updateUI(lastStep) {
    if (lastStep === -1) { disableSubmit(); return }

    currentStep = lastStep || currentStep
    step = steps[currentStep]

    updateSubmitButton({key: step.key, 
                        label: step.label, 
                        icon: step.icon, 
                        subtext: step.subtext})

    setDate()
}

export function nextStep() {
    const modal = document.querySelector('.modal.active')
    updateMarkers({ hours: modal.querySelector('.time_hours').value,
                    minutes: modal.querySelector('.time_minutes').value})

    if (currentStep < steps.length - 1) {
        modal.querySelector('.form_submit').classList.toggle(step.key)

        currentStep++
        updateUI()
        return
    }

    disableSubmit()
}

function updateMarkers({hours, minutes}) {
    const markers = document.querySelectorAll('.marker')
    const marker = markers[currentStep]

    marker.classList.add('marked')
    marker.setAttribute('data-step', step.id)
    marker.querySelector('.marker_icon').classList.add(step.key)
    marker.querySelector('.marker_hour').textContent = `${hours}:${minutes}`
    marker.querySelector('.marker_register').classList.add('visible')
}

function setDate() {
    const modal = document.querySelector('.modal.active')
    const today = new Date()
    const formatted = today.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    })

    modal.querySelector('.modal_footering_text').textContent = formatted
}

function updateSubmitButton({key, label, icon, subtext}) {
    const modal = document.querySelector('.modal.active')
    const button = modal?.querySelector('.form_submit')
    const iconElem = modal?.querySelector('.form_submit_icon')
    const text = modal?.querySelector('.form_submit_text')
    const subtextElem = modal?.querySelector('.form_submit_subtext')
    const nextRegister = modal?.querySelector('.modal_heading_subtext')

    button.className = `form_submit ${key}`
    iconElem.textContent = icon
    text.textContent = label
    subtextElem.textContent = subtext
    nextRegister.textContent = label
}

function disableSubmit() {
    const button = document.querySelector('.form_submit');
    button.disabled = true;

    updateSubmitButton({key: 'done', label: 'Dia encerrado', icon: 'check_circle', subtext: 'Todos os registros feitos'});
}

