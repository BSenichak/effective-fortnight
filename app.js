const express = require("express")

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.static("static"))
app.use(express.json())

let ads = []

app.get("/", (req, res)=>{
    res.render("index", { ads })
})

app.post("/add", (req, res)=>{
    ads.push(req.body)
    res.status(200)
    res.send()
})


app.get("/ads", (req, res)=> {
    res.status(200)
    res.setHeader("content-type", "application/json")
    res.json(ads)
})

app.use((req, res, next)=>{
    res.status(404)
    res.render("notfound")
})

app.listen(3000, ()=>console.log("server on"))