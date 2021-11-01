const Contenedor = require("../../Contenedor")
const ContainerCart = new Contenedor("./data/carrito.json")

const createCart = async (product) =>{
    const newProductSaved = await ContainerCart.save(product)
    return newProductSaved
}

const deleteCartById = async (idCart) =>{
    const cartDeleteId = await ContainerCart.deleteById(idCart)
    return cartDeleteId
}

const deleteProductoinCart = async (cartId, productId) => {
    const getCart = await ContainerCart.getById(cartId)

    if(getCart === false){
        return false
    } else {
        const newCart = getCart[0].producto.filter(product => product.id != productId)
        const cartUpdated = await ContainerCart.replace(cartId, newCart)

        return cartUpdated
    }
    
}

const getCartId = async (idCart) =>{
    const getCart = await ContainerCart.getById(idCart)
    return getCart
}

const addProductInCart = async (idCart, product) => {
    const addInIdCart = await ContainerCart.update(idCart, product)
    return addInIdCart
}

module.exports = {
    createCart,
    deleteCartById,
    getCartId,
    addProductInCart,
    deleteProductoinCart
}