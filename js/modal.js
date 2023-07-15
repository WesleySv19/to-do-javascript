const openModalButton = document.querySelector('.open_modal')
const closeModalButton = document.querySelector('#close_modal')
const modal = document.querySelector('#modal')
const fade = document.querySelector('#fade')
const titleModal = document.querySelector('#title_modal')
const textModal = document.querySelector('#text_modal')

const toggleModal = () => {
    [modal, fade].forEach((element) => element.classList.toggle('hide'))
}

[openModalButton, closeModalButton, fade].forEach((element) => {
    element.addEventListener('click', () => toggleModal())
}) 

