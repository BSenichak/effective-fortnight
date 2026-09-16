const express = require("express")

const app = express()

app.use(express.static("static"))
app.use(express.json())

let ads = []

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

app.listen(3000, ()=>console.log("server on"))