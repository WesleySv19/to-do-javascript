
const openModalButton = document.querySelector('#btn_new_task')
const closeModalButton = document.querySelector('#close_modal')
const modal = document.querySelector('#modal')
const fade = document.querySelector('#fade')
const titleModal = document.querySelector('#title_modal')
const textModal = document.querySelector('#text_modal')
const localStorageKey = 'to-do-list'
const btn_new_task = document.querySelector('#btn_new_task')

const toggleModal = () => {
    [modal, fade].forEach((element) => element.classList.toggle('hide'))
}

[openModalButton, closeModalButton, fade].forEach((element) => {
    element.addEventListener('click', () => toggleModal())
}) 

const validateIfExistsNewTask = () => {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    let inputValue = document.querySelector('#input-new-task').value
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
} 

const messageModal = (title, text) => {
    titleModal.textContent = title
    textModal.textContent = text
}

btn_new_task.addEventListener('click', () => {
    let input = document.querySelector('#input-new-task')
    input.style.border = ''
    
    if(!input.value) {
        input.style.border = '2px solid #FF6347'
        messageModal('Erro', 'Ops digite algo para inserir em sua lista')

    } else if(validateIfExistsNewTask()) {
        messageModal('Ops...', 'Ops... já existe uma tarefa com essa descrição')

    } else {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues()
        messageModal('Ok', 'Nova tarefa adicionada')
        input.value = ''

    }
})

const showValues = () => {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    let list = document.querySelector('#to-do-list')
    list.innerHTML = ''
    
    for(let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i] ['name']}<button onclick='removeItem("${values[i] ['name']}")' id="btn_ok"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
      </svg></button></li>`
    }
}

const enterKeyCode = () => {
    document.addEventListener('keydown', (e) => {
        if(e.key == 'Enter') {
            btn_new_task.click()
        }
    })
}
enterKeyCode()

const removeItem = (data) => {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
    let index = values.findIndex(x => x.name == data)
    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
}

showValues()
