const express = require("express")
const { Server: HttpServer} = require("http")
const { Server: IoServer} = require ("socket.io")

const Contenedor = require("../Contenedor")
const ContenedorProducts = new Contenedor("../data/productos.json")
const ContenedorCart = new Contenedor("../data/carrito.json")

const routerProducts = require("./router/products")
const routerCart = require("./router/cart")

const PORT = 8080
const glitchPORT = process.env.PORT

const app = express()
const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)

let admin = false

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))











app.use("/api/productos", routerProducts)
app.use("/api/carrito", routerCart)

httpServer.listen(PORT, () => console.log(`Servidor corriendo en el Puerto: ${PORT}`))
httpServer.on("error", error => console.log(`Error en el servidor: ${error}`))