require("dotenv").config()
const express = require("express")
const PORT = process.env.PORT || 8080
const app = express()

const { Server: HttpServer} = require("http")
const { Server: IoServer} = require("socket.io")
const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)
const connection = require("./controllers/messages")

const indexRouter = require("./router/index")

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static( "./public"))

app.use(indexRouter)

io.on("connection", connection)

app.listen(PORT, err => {
    if(!err) console.log(`Servidor express escuchando en el puerto ${PORT}`)
})
