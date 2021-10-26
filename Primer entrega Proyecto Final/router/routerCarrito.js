const express = require("express")
const routerCarrito = express.Router()

const Contenedor = require("../Contenedor")
const ContenedorCarrito = new Contenedor("../data/carrito.json")

module.exports = routerCarrito