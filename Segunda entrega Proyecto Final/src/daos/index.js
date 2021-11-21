const ProductDaoFile = require("./products/ProductDaoFile")
const ProductDaoFirestore = require("./products/ProductDaoFirestore")
const ProductDaoMemory = require("./products/ProductDaoMemory")
const ProductDaoMongoDB = require("./products/ProductDaoMongoDB")

const CartDaoFile = require("./cart/CartDaoFile")
const CartDaoFirestore = require("./cart/CartDaoFirestore")
const CartDaoMemory = require("./cart/CartDaoMemory")
const CartDaoMongoDB = require("./cart/CartDaoMongoDB")

const daos = {}

if (process.env.STORAGE === "mongodb") {
    daos["ProductDao"] = ProductDaoMongoDB
    daos["CartDao"] = CartDaoMongoDB
}

if (process.env.STORAGE === "memory") {
    daos["ProductDao"] = ProductDaoMemory
    daos["CartDao"] = CartDaoMemory
}

if (process.env.STORAGE === "firestore") {
    daos["ProductDao"] = ProductDaoFirestore
    daos["CartDao"] = CartDaoFirestore
}

if (process.env.STORAGE === "file") {
    daos["ProductDao"] = ProductDaoFile
    daos["CartDao"] = CartDaoFile
}

module.exports = daos;