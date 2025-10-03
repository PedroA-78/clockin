export function setupBackups() {
    const exportAction = document.querySelector('[data-manage="export"]')
    const importAction = document.querySelector('#manage_action_import')

    exportAction.addEventListener('click', exportData)
    importAction.addEventListener('change', (e) => { 
        const file = e.target.files[0]
        if (file) importData(file)
    })
}

function exportData() {
    const data = localStorage.getItem('clockin')
    if (!data) {
        alert('Nenhum registro de ponto encontrado para exportar.')
        return
    }

    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'registros-de-ponto.json'
    a.click()

    URL.revokeObjectURL(url)
}

function importData(file) {
    const reader = new FileReader()
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result)
            localStorage.setItem('clockin', JSON.stringify(data))
            alert("Registros de ponto, importados com sucesso!")
            location.reload()
        } catch (err) {
            alert("Arquivo inválido! não foi possível importar os registros de ponto.")
        }
    }
    reader.readAsText(file)
}