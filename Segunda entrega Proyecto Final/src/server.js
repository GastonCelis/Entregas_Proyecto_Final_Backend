require("dotenv").config()

const express = require("express")

const routerProducts = require("./router/products")
const routerCart = require("./router/cart")

const PORT = 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))

app.use("/api/productos", routerProducts)
app.use("/api/carrito", routerCart)

app.listen(PORT, () => console.log(`Servidor corriendo en el Puerto: ${PORT}`))
app.on("error", error => console.log(`Error en el servidor: ${error}`))