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

const updateProduct = async (id, product) => {
    const productUpdated = await ContenedorProducts.update(id, product)
    return productUpdated
}

const deleteProductById = async (id) =>{
    const productDeleted = await ContenedorProducts.deleteById(id)
    return productDeleted
}

module.exports = {
    getAllProducts,
    savedProduct,
    updateProduct,
    deleteProductById
}