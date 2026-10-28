const express = require("express")
const multer = require("multer")
const path = require("path")
const db = require("./db")


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
    db.query("SELECT * FROM ads", (err, result)=>{
        let ads = result
        ads.forEach(ad => {
            ad.image = JSON.parse(ad.image)
        })
        res.render("index", { ads })
    })
})

app.post("/add", upload.fields([{name: "image"}]) ,(req, res)=>{
    let data = req.body
    data.image = req.files.image.map(file=>file.filename)
    data.image = JSON.stringify(data.image)
    db.query("INSERT INTO ads SET ?", data, (err)=>{
        if(err){

            res.status(500)
            res.send("data base error")
            return
        }
        res.status(201)
        res.end()
    })

})


app.get("/ads", (req, res)=> {
    res.status(200)
    res.setHeader("content-type", "application/json")
    res.json(ads)
})

app.use("/post/:id", (req, res)=>{
    let postId = req.params.id
    db.query(`SELECT a.*, c.author, c.comment, c.id AS commentId
        FROM ads AS a LEFT JOIN comments AS c
        ON a.id = c.ads_id
        WHERE a.id = ?`, postId, (err, result)=>{
        if(err || result.length == 0){
            console.log(err.message)
            res.status(404)
            res.render("notfound")
            return
        }
        let post = result[0]
        post.image = JSON.parse(post.image)
        res.render("post", { post, comments: result })
    })
})

app.post("/comment", (req, res)=>{
    let data = req.body;
    db.query("INSERT INTO comments SET ?", data, (err, result)=>{
        if(err) {
            console.log(err.message)
            return res.status(500).end()
        }
        res.status(201)
        res.end()
    })
})

app.use((req, res, next)=>{
    res.status(404)
    res.render("notfound")
})

app.listen(3000, ()=>console.log("server on"))