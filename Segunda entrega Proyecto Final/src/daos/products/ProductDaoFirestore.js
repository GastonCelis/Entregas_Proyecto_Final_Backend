const admin = require("firebase-admin")
const ContainerFirestore = require("../../containers/ContainerFirestore")

class ProductDaoFirestore extends ContainerFirestore{
    constructor(){
        super(admin.firestore(), "products")
    }
}

module.exports = ProductDaoFirestore