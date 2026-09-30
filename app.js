const express = require("express")
const multer = require("multer")
const path = require("path")

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.static("static"))
app.use("/uploads", express.static("uploads"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

let ads = []

app.get("/", (req, res)=>{
    res.render("index", { ads })
})

app.post("/add", upload.fields([{name: "image"}]) ,(req, res)=>{
    let data = req.body
    data.image = req.files.image.map(file=>file.filename)
    data.id = ads.length;
    ads.push(data)
    res.status(201)
    res.end()
})


app.get("/ads", (req, res)=> {
    res.status(200)
    res.setHeader("content-type", "application/json")
    res.json(ads)
})

app.use("/post/:id", (req, res)=>{
    let postId = req.params.id
    let post = ads.find(ad => ad.id == Number(postId))
    if(!post){
        res.status(404)
        res.render("notfound")
        return
    }
    res.render("post", { post })
})

app.use((req, res, next)=>{
    res.status(404)
    res.render("notfound")
})

app.listen(3000, ()=>console.log("server on"))