require("dotenv").config()
const jwt = require("jsonwebtoken")

const PRIVATE_KEY = process.env.PRIVATE_KEY

const generateToken = (user) => {
    const token = jwt.sign({ data: user}, PRIVATE_KEY, {expiresIn: "12h"})

    return token
}

module.exports = generateToken