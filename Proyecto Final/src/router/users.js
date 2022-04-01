const express = require("express")

const routerUsers = express.Router()

const usersController = require("../controllers/users")

routerUsers.post("/register", usersController.signup)

routerUsers.post("login", usersController.login)

module.exports = routerUsers