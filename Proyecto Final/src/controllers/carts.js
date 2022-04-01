const Cart = require("../daos/Carts")

const cartDao = new Cart()

const readAll = async (req, res) =>{
    const carts = await cartDao.readAll()
    res.send({ carts })
}

const readById = async (req, res) =>{
    const id = req.params.id
    const cart = await cartDao.readById(id)
    res.send({ cart })
}

const create = async (req, res) =>{
    const newcart = req.body
    const cartSaved = await cartDao.create(newcart)
    res.send({ ID_New_cart: cartSaved })
}

const update = async (req, res) =>{
    const idcart = req.params.id
    const newcart = req.body
    const updatedcart = await cartDao.update(idcart, newcart)

    if(updatedcart === false){
        res.send({
            Mensaje: `No se pudo actualizar, el carrito no exitente o los datos son incorrectos`
        })
    } else {
        res.send({
            Mensaje: `carrito en ID: ${idcart}, Actualizado`
        })
    }
}

const deleteAll = async (req, res) => {
    await cartDao.deleteAll()
}

const deleteById = async (req, res) => {
    const cartId = req.params.id
    const cartDelete = await cartDao.deleteById(cartId)
    console.log(cartDelete)
}

module.exports ={
    readAll,
    readById,
    create,
    update,
    deleteAll,
    deleteById
}