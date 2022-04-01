const express = require("express")

const routerOrders = express.Router()

const ordersController = require("../controllers/orders")

routerOrders.post("/buy", ordersController.buy)

module.exports = routerOrders