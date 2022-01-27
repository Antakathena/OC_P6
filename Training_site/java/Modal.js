// https://www.youtube.com/watch?v=EIC1_0Dfa9o
//à 10:39 class js modal (début js)

let modal = null

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    // ajouter une erreur au cas où l'utilisateur ne trouve rien
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelector('.js-modal-close').addEventlistener('click', closeModal)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener("click", closeModal)
    modal.querySelector('.js-modal-close').removeEventlistener('click', closeModal)
    modal = null

}


document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)

})