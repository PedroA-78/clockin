export function setupMenu() {
    const menuItems = document.querySelectorAll('.menu_item')
    const sections = document.querySelectorAll('.main section')
    const headings = document.querySelectorAll('.header div')

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.dataset.target

            sections.forEach(section => { section.classList.toggle('active', section.id === targetId) })
            menuItems.forEach(item => { item.classList.toggle('active', item.dataset.target === targetId)})
            headings.forEach(heading => { heading.classList.toggle('active', heading.classList.contains(`${targetId}_heading`))})
        })
    })
}