const express = require("express")
const routerProducts = express.Router()

const { getAllProducts, savedProduct, updateProduct, deleteProductById } = require("../models/products")
const isAdmin = require("../middlewares/admin")

routerProducts.get("/", async (req, res) =>{
    const products = await getAllProducts()
    res.send({ Data: products })
})

routerProducts.post("/", isAdmin, async (req, res) =>{
    const newProduct = req.body
    const productSaved = await savedProduct(newProduct)
    res.send({ Data: productSaved })
})

routerProducts.put("/:id", isAdmin, async (req, res) =>{
    const idProduct = req.params.id
    const newProduct = req.body
    const updatedProduct = await updateProduct(idProduct, newProduct)

    if(updatedProduct === false){
        res.send({
            Mensaje: `No se pudo actualizar, producto no exitente o datos incorrectos`
        })
    } else {
        res.send({
            Mensaje: `Producto en ID: ${idProduct}, Actualizado`
        })
    }
})

routerProducts.delete("/:id", isAdmin, async (req, res) => {
    const productId = req.params.id
    const productDelete = await deleteProductById(productId)

    if (productDelete === false) {
        res.send({
            Mensaje: `El producto con ID: ${productId}, no se encontró`
        })
    } else {
        res.send({
            Mensaje: `El producto con ID: ${productId}, se eliminó correctamente`
        })
    }
})

module.exports = routerProducts