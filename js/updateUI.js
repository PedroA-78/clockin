const steps = [
    { 
        key: "clock_in",
        label: "Entrada",
        icon: "arrow_downward",
        subtext: "Iniciar expediente"
    },
    { 
        key: "interval_start",
        label: "Saída para o intervalo",
        icon: "restaurant", 
        subtext: "Pausa para almoço"
    },
    { 
        key: "interval_end",
        label: "Volta do Intervalo",
        icon: "restaurant", 
        subtext: "Retomar expediente"
    },
    { 
        key: "clock_out",
        label: "Saída",
        icon: "arrow_upward",
        subtext: "Encerrar expediente"
    }
]

let currentStep = 0 // começa no primeiro
let step = steps[currentStep]

export function updateUI(lastStep) {
    if (lastStep === 3) { disableSubmit(); return }

    currentStep = lastStep || currentStep
    step = steps[currentStep]

    updateSubmitButton({key: step.key, 
                        label: step.label, 
                        icon: step.icon, 
                        subtext: step.subtext})

    setDate()
}

export function nextStep() {
    updateMarkers({ hours: document.querySelector('.time_hours').value,
                    minutes: document.querySelector('.time_minutes').value})

    if (currentStep < steps.length - 1) {
        document.querySelector('.form_submit').classList.toggle(step.key)

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
    marker.querySelector('.marker_icon').classList.add(step.key)
    marker.querySelector('.marker_hour').textContent = `${hours}:${minutes}`
    marker.querySelector('.marker_register').classList.add('visible')
}

function setDate() {
    const today = new Date()
    const formatted = today.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    })

    document.querySelector('.modal_footering_text').textContent = formatted
}

function updateSubmitButton({key, label, icon, subtext}) {
    const button = document.querySelector('.form_submit')
    const iconElem = document.querySelector('.form_submit_icon')
    const text = document.querySelector('.form_submit_text')
    const subtextElem = document.querySelector('.form_submit_subtext')
    const nextRegister = document.querySelector('.modal_heading_subtext')

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

