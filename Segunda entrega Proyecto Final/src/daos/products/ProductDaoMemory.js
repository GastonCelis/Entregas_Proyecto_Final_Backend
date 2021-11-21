const ContainerMemory = require("../../containers/ContainerMemory");

class ProductDaoMemory extends ContainerMemory{
    constructor (){
        super([])
    }
}

module.exports = ProductDaoMemory