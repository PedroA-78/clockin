export function openModal(modalId) {
    document.getElementById(modalId).classList.add('active')
    closeModal(modalId)
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId)
    const close = () => { modal.classList.remove('active') }

    const overylay = modal.querySelector('.modal_overlay')

    overylay?.addEventListener('click', close)
}