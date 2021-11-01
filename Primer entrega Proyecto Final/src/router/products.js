const express = require("express")
const routerProducts = express.Router()

const { getAllProducts, savedProduct } = require("../models/products")
const isAdmin = require("../middlewares/admin")

routerProducts.get("/", async (req, res) =>{
    const data = await getAllProducts()
    res.send({ data })
})

routerProducts.post("/", isAdmin, async (req, res) =>{
    const newProduct = req.body
    const productSaved = await savedProduct(newProduct)
    res.send({ data: productSaved })
})

module.exports = routerProducts