const express = require("express")
const routerProductos = express.Router()

const Contenedor = require("../Contenedor")
const ContenedorProductos = new Contenedor("../data/productos.json")

module.exports = routerProductos