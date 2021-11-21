const ContainerMemory = require("../../containers/ContainerMemory");

class CartDaoMemory extends ContainerMemory{
    constructor (){
        super([])
    }
}

module.exports = CartDaoMemory