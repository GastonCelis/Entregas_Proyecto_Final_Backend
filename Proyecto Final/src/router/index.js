const express = require("express")

const router = express.Router()

const productsRouter = require("./products")
const cartsRouter = require("./carts")
const ordersRouter = require("./orders")
const usersRouter = require("./users")

router.use(productsRouter)
router.use(cartsRouter)
router.use(ordersRouter)
router.use(usersRouter)

module.exports = router