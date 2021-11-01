const Contenedor = require("../../Contenedor")
const ContenedorProducts = new Contenedor("./data/productos.json")

const getAllProducts = async () =>{
    const listProducts = await ContenedorProducts.getAll()
    return listProducts
}

const savedProduct = async (product) =>{
    const productSaved = await ContenedorProducts.save(product)
    return productSaved
}

module.exports = {
    getAllProducts,
    savedProduct
}