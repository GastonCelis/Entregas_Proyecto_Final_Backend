const ContainerFiles = require("../../containers/ContainerFiles");

class ProductDaoFile extends ContainerFiles{
    constructor () {
        super("../../data/productos.json")
    }
}

module.exports = ProductDaoFile