const admin = require("firebase-admin")
const ContainerFirestore = require("../../containers/ContainerFirestore")

class CartDaoFirestore extends ContainerFirestore{
    constructor(){
        super(admin.firestore(), "carts")
    }
}

module.exports = CartDaoFirestore