const express = require("express")
const Product = require("../daos/Product")
const dotenv = require("dotenv").config()
const nodemailer = require("nodemailer")

const twilio = require("twilio")
const accountSid = "ACd691f28f46e6964d10593b4a73e09acc"
const authToken = "62e94db6693b6a1d7a11cdb2f2232c40"
const client = twilio(accountSid, authToken)

const routerProducts = express.Router()

const productDao = new Product()

routerProducts.get("/", async (req, res) =>{
    const products = await productDao.readAll()
    res.send({ products })
})

routerProducts.get("/:id", async (req, res) =>{
    const id = req.params.id
    const product = await productDao.readById(id)
    res.send({ product })
})

routerProducts.post("/", async (req, res) =>{
    const newProduct = req.body
    const productSaved = await productDao.create(newProduct)
    res.send({ ID_New_Product: productSaved })
})

routerProducts.put("/:id", async (req, res) =>{
    const idProduct = req.params.id
    const newProduct = req.body
    const updatedProduct = await productDao.update(idProduct, newProduct)

    if(updatedProduct === false){
        res.send({
            Mensaje: `No se pudo actualizar, producto no exitente o datos incorrectos`
        })
    } else {
        res.send({
            Mensaje: `Producto en ID: ${idProduct}, Actualizado`
        })
    }
})

routerProducts.delete("/", async (req, res) => {
    await productDao.deleteAll()
})

routerProducts.delete("/:id", async (req, res) => {
    const productId = req.params.id
    const productDelete = await productDao.deleteById(productId)
    console.log(productDelete)
})

routerProducts.post("/buy", async (req, res)=>{
    const productBuy = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }

    const newBuy = await productDao.create(productBuy)

    if(newBuy){
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: process.env.EMAILTEST,
                pass: process.env.PASSMAILTEST
            }
        })
    
        const mailOptions = {
            from: "Tercer entrega Proyecto Final",
            to: process.env.EMAILTEST,
            subject: "Nuevos Productos comprados",
            html: `<h1>Productos Comprados:</h1>
                    <ul>
                        <li>${productBuy.title}</li>
                        <li>${productBuy.price}</li>
                        <li>${productBuy.thumbnail}</li>
                    </ul>`
        }
        
        try{
            const info = await transporter.sendMail(mailOptions)
            console.log(info)
        } catch (error) {
            console.log(error)
        }

        const options = {
            body: "Su pedido ha sido recibido y se encuentra en proceso",
            mediaUrl: [productBuy.thumbnail],
            from: "whatsapp:+14155238886",
            to: "whatsapp:+543517614768"
        }

        try {
            const message = await client.messages.create(options)
            console.log(message)
        } catch (error) {
            console.log(error)
        }
    }
})

module.exports = routerProducts