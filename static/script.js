let openButton = document.querySelector(".open")
let closeButton = document.querySelector(".close")
let modal = document.querySelector(".modal")
let form = document.querySelector(".modal form")
let wrapper = document.querySelector(".wrapper")

openButton.addEventListener("click", ()=> modal.style.display = "grid")
closeButton.addEventListener("click", ()=> modal.style.display = "none")

form.addEventListener("submit", (event)=>{
    event.preventDefault()
    fetch("/add", {
        method: "POST",
        body: new FormData(event.target)
    }).then(()=> location.reload())
})