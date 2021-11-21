const ContainerFiles = require("../../containers/ContainerFiles");

class CartDaoFile extends ContainerFiles{
    constructor () {
        super("../../data/carrito.json")
    }
}

module.exports = CartDaoFile