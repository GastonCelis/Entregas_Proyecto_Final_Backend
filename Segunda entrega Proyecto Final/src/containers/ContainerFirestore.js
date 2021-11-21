const admin = require("firebase-admin")
const config = require("../../config")

class ContainerFirestore{
    constructor(db, collection){
        this.db = db
        this.query = db.collection(collection)
        this.init()
    }

    async init() {
        if (!this.conection) {
            const serviceAccount = require(config.firestore);

            await admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            })
        }
    }


    async create(product) {
        try {
            const idDocument = this.query.doc()
            await idDocument.create(product)
            return idDocument
        } catch (error) {
            console.error(`¡Error!: ${error}`)
        }
    }


    async readAll(){
        try{
            const querySnapshot = await this.query.get()
            let documents = querySnapshot.docs

            const allDocuments = documents.map(document => ({
                name: document.name,
                description: document.description,
                code: document.code,
                price: document.price,
                stock: document.stock,
                photo: document.photo,
                timestamp: document.timestamp
            }))

            return allDocuments
        } catch(error) {
            console.error(`¡Error!: ${error}`)
        }
    }


    async readById(id){
        try{
            const document = this.query.doc(id)
            const item = await document.get()

            if(item.length === 0){
                return false
            } else {
                return item.data()
            }
        } catch (error) {
            console.error(`¡Error!: ${error}`)
        }
    }


    async update(id, product){
        try{
            const document = this.query.doc(id)
            let upgrade = await document.update(product)
            
            if (!document){
                return false
            } else {
                return upgrade
            }
        } catch(error){
            console.error(`¡Error!: ${error}`)
        }
    }


    async deleteAll(){
        try {
            const document = this.query.doc()
            await document.delete()
        } catch(error) {
            console.error(`¡Error!: ${error}`)
        }
    }

    
    async deleteById(id){
        try{
            const document = this.query.doc(id)
            await document.delete()
        } catch(error) {
            console.error(`¡Error!: ${error}`)
        }
    }
}

module.exports = ContainerFirestore