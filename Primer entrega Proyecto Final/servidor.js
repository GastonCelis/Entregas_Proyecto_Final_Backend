const express = require("express")
const { Server: HttpServer} = require("http")
const { Server: IoServer} = require ("socket.io")

const Contenedor = require("./Contenedor")
const ContenedorProductos = new Contenedor("./data/productos.json")
const ContenedorCarrito = new Contenedor("./data/carrito.json")

const routerProductos = require("./router/routerProductos")
const routerCarrito = require("./router/routerCarrito")

const PORT = 8080
const glitchPORT = process.env.PORT

const app = express()
const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)

let administrador = false

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))











app.use("/productos", routerProductos)
app.use("/carrito", routerCarrito)

httpServer.listen(PORT, () => console.log(`Servidor corriendo en el Puerto: ${PORT}`))
httpServer.on("error", error => console.log(`Error en el servidor: ${error}`))