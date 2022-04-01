require("dotenv").config()

const Order = require("../daos/Orders")
const transporter = require("../service/nodemailer")

const orderDao = new Order()

const buy = async (req, res)=>{
    const productBuy = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }

    const newBuy = await orderDao.create(productBuy)

    if(newBuy){
        const mailOptions = {
            from: "Proyecto Final",
            to: process.env.EMAIL,
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
    }
}

module.exports = {buy}