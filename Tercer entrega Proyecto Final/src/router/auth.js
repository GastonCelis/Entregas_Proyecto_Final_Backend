const { Router } = require("express")
const passport = require("passport")
const path = require("path")
//const { createHash } = require("../auth/authIndex")
//const UserDao = require("../daos/Users")

const authRouter = new Router()
//const userDao = new UserDao()

authRouter.get("/", (req, res) => {
    res.redirect("/home")
})

authRouter.get("/login", (req, res) => {
    const email = req.session?.email
    if (email) {
        res.redirect("/")
    } else {
        res.sendFile(path.join(process.cwd(), "/public/pages/login.html"))
    }
})
authRouter.post("/login", passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/faillogin" }))
authRouter.get("/faillogin", (req, res) => {
    res.send({Mensaje: "Error de Ingreso"})
})

authRouter.get("/signup", (req, res) => {
    const email = req.session?.email
    if (email) {
        res.redirect("/")
    } else {
        res.sendFile(path.join(process.cwd(), "/public/pages/register.html"))
    }
})
authRouter.post("/signup", passport.authenticate("signup", { 
    successRedirect: "/home", 
    failureRedirect: "/failsignup" }))
authRouter.get("/failsignup", (req, res) => {
    res.send({Mensaje: "Error en el Registro"})
})

authRouter.get("/logout", (req, res) => {
    const email = req.session?.email
    if (email) {
        req.session.destroy(err => {
            if (!err) {
                res.redirect("/out?name="+email)
            } else {
                res.redirect("/")
            }
        })
    } else {
        res.redirect("/")
    }
})

authRouter.get("/out", (req, res) => {
    res.sendFile(path.join(process.cwd(), "/public/pages/logout.html"))
})

authRouter.post("/login", (req, res) => {
    req.session.nombre = req.body.nombre
    res.redirect("/home?name="+req.body.nombre)
})

module.exports = authRouter