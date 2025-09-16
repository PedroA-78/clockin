// const steps = ['clock_in', 'interval_start', 'interval_end', 'clock_out']

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

let currentStep = 0; // começa no primeiro
let step = steps[currentStep]

export function updateUI() {
    step = steps[currentStep]

    const button = document.querySelector('.form_submit')
    const icon = document.querySelector('.form_submit_icon')
    const text = document.querySelector('.form_submit_text')
    const subtext = document.querySelector('.form_submit_subtext')

    const nextRegister = document.querySelector('.modal_heading_subtext')

    button.classList.toggle(step.key)
    icon.textContent = step.icon
    text.textContent = step.label
    subtext.textContent = step.subtext

    nextRegister.textContent = step.label

}

export function nextStep() {
    if (currentStep < steps.length -1) {
        document.querySelector('.form_submit').classList.toggle(step.key)

        currentStep++
        updateUI()
    }
}

export function updateMarkers(time) {
    const markers = document.querySelectorAll('.marker')
    const marker = markers[currentStep]

    marker.classList.add('marked')
    marker.querySelector('.marker_icon').classList.add(step.key)
    marker.querySelector('.marker_hour').textContent = `${time.hours}:${time.minutes}`
}
