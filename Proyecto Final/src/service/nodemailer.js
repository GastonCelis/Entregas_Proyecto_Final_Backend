require("dotenv").config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSMAIL
    }
})

/*const mailOptions = {
    from: "Proyecto Final",
    to: ["hellen.gleichner@ethereal.email"],
    subject: "Nueva Compra Realizada",
    html: "",
}

transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
        console.log(err)
        return err
    }
    console.log(info)
})*/

module.exports = transporter