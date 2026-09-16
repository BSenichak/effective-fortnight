let openButton = document.querySelector(".open")
let closeButton = document.querySelector(".close")
let modal = document.querySelector(".modal")
let form = document.querySelector(".modal form")
let wrapper = document.querySelector(".wrapper")

fetch("/ads").then(async (res) =>{
    let ads = await res.json()
    ads.forEach((ad)=> {
        wrapper.innerHTML += `
        <div class="ad"> 
            <h3>${ad.title}</h3>
            <p>${ad.desc}</p>
        </div>
        `
    })
})

openButton.addEventListener("click", ()=> modal.style.display = "grid")
closeButton.addEventListener("click", ()=> modal.style.display = "none")

form.addEventListener("submit", (event)=>{
    event.preventDefault()
    fetch("/add", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            title: event.target["title"].value,
            desc: event.target["desc"].value
        })
    }).then(()=> location.reload())
})