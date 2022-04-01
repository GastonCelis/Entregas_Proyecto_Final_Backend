const express = require("express")

const routerCarts = express.Router()

const cartsController = require("../controllers/carts")
const isAdmin = require("../middlewares/isAdmin")

routerCarts.get("/", cartsController.readAll)

routerCarts.get("/:id", cartsController.readById)

routerCarts.post("/", isAdmin, cartsController.create)

routerCarts.put("/:id", isAdmin, cartsController.update)

routerCarts.delete("/", isAdmin, cartsController.deleteAll)

routerCarts.delete("/:id", isAdmin, cartsController.deleteById)

module.exports = routerCarts