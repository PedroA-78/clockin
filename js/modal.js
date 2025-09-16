function openModal(modalId) {
    document.getElementById(modalId).classList.add('active')
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId)
    const close = () => { modal.classList.remove('active') }

    const overylay = modal.querySelector('.modal_overlay')

    overylay?.addEventListener('click', close)
}

export { openModal, closeModal }