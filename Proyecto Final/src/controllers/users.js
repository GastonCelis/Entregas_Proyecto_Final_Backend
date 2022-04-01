require("dotenv").config()

const User = require("../daos/Users")

const userDao = new User()

const { isValidPassword, createHash } = require("../auth/authIndex")

const generateToken = require("../service/jwtConfig")

const transporter = require("../service/nodemailer")

const signup = async (req, username, done) => {
    const findUser = await userDao.readOneUser(username)
    console.log(findUser)

    if(findUser){
        return done(null, false)
    }

    if(findUser === error){
        return done(error)
    }

    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.name,
        password: createHash(password),
        email: req.body.email,
    }
    
    const newUserCreated = userDao.create(newUser)

    const accessToken = generateToken(newUser)

    if(newUserCreated === error){
        return done(error)
    } else {
        const mailOptions = {
            from: "Proyecto Final",
            to: process.env.EMAILTEST,
            subject: "Nuevo Usuario registrado",
            html: `<h1>Nuevo Usuario:</h1><span>${accessToken}</span>`
        }
        
        try{
            const info = await transporter.sendMail(mailOptions)
            console.log(info)
        } catch (error) {
            console.log(error)
        }

        done(null, newUserCreated)
    }
}

const login = async (req, res, done) => {
    const {username, password} = req.body
    const findUser = userDao.readOneUser(username)

    if(!findUser){
        return res.json({error: "Credenciales Inválidas"})
    }

    if(findUser == error){
        return done(error)
    }

    if (!isValidPassword(username, password)) {
        return done(null, false)
    }

    return done(null, findUser)
}

module.exports = {
    signup,
    login
}