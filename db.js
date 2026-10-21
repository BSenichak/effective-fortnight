require("dotenv").config()
const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: process.env.HOST || "localhost",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || "root",
    port: process.env.PORT || 3306,
    database: process.env.DATABASE || "world"
})

module.exports = connection;