const express = require("express")
const routerCart = express.Router()

const { createCart, deleteCartById, getCartId, addProductInCart, deleteProductoinCart } = require("../models/cart")

routerCart.post("/", async (req, res) =>{
    const newProductInCart = req.body
    if (newProductInCart.id == "" || newProductInCart.id == undefined){
        newProductInCart.id = 1
        newProductInCart.timeStamp = Date.now()
    }

    const listProductoCart = {
        "producto": [ newProductInCart ]
    }
    const productInCartSaved = await createCart(listProductoCart)
    res.send({ idCartSaved: productInCartSaved })
})

routerCart.post("/:id/productos", async (req, res) =>{
    const cartId = req.params.id
    const newProduct = req.body

    const saveProductInIdCart = await addProductInCart(cartId, newProduct)

    if (saveProductInIdCart === false){
        res.send({
            Mensaje: `No se pudo agregar el producto en el ID: ${cartId}`
        })
    } else {
        res.send({
            Mensaje: `Se agregó correctamente el producto al carrito con el ID: ${cartId}`
        })
    }
})

routerCart.delete("/:id", async (req, res) => {
    const idCart = req.params.id
    const deleteCartId = await deleteCartById(idCart)
    
    if (deleteCartId === false) {
        res.send({
            Mensaje: `No se encontró el carrito con el id ${idCart}, no pudo ser eliminado`
        })
    } else {
        res.send({
            Mensaje: `Se eliminó el carrito con el id ${idCart}`
        })
    }
})

routerCart.delete("/:id/productos/:id_prod", async (req, res) => {
    const idCart = req.params.id
    const idProduct = req.params.id_prod
    
    const newCart = await deleteProductoinCart(idCart, idProduct)

    if (newCart === false) {
        res.send({
            Mensaje: `No se encontró el producto o el carrito correspondiente`
        })
    } else {
        res.send({
            Mensaje: `Se eliminó el producto con ID: ${idProduct}, del carrito con ID: ${idCart}`
        })
    }

})

routerCart.get("/:id/productos", async (req, res) =>{
    const idCart = req.params.id
    const cartWithId = await getCartId(idCart)
    if (cartWithId === false){
        res.send({
            Mensaje: `El carrito con ID: ${idCart}, no se encontró`
        })
    } else {
        res.send({Data: cartWithId})
    }
})




module.exports = routerCart