export function setupMenu() {
    const menuItems = document.querySelectorAll('.menu_item')
    const sections = document.querySelectorAll('.main section') 

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.dataset.target

            sections.forEach(section => { section.classList.toggle('active', section.id === targetId) })
            menuItems.forEach(item => { item.classList.toggle('active', item.dataset.target === targetId)})
        })
    })
}