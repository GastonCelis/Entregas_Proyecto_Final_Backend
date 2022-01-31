const express = require("express")
const dotenv = require("dotenv").config()
const cluster = require("cluster")
const nodemailer = require("nodemailer")

const compression = require("compression")
const logger = require("../logger/index")

const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const { Server: HttpServer} = require("http")
const { Server: IoServer} = require("socket.io")

const faker = require("faker")
const MessageDao = require("./daos/Messages")
const UserDao = require("./daos/Users")
const { isValidPassword, createHash } = require("./auth/authIndex")

const authRouter = require("./router/auth")
const homeRouter = require("./router/home")
const randomRouter = require("./router/random")
const inforRouter = require("./router/info")
const productsRouter = require("./router/products")

const messageDao = new MessageDao()
const userDao = new UserDao()

const PORT = process.env.PORT || 8080
const app = express()
const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)

const numCPUs = require("os").cpus().length
const isCluster = process.argv[2] === "CLUSTER"

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static( "./public"))

app.use(authRouter)
app.use(homeRouter)
app.use(randomRouter)
app.use(inforRouter)
app.use(productsRouter)

app.use(session({
    secret: "silence",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use("signup", new LocalStrategy( async (req, username, password, done) => {
        const findUser = await userDao.readOneUser(username)
        console.log(findUser)

        if(findUser){
            return done(null, false)
        }

        if(findUser === error){
            return done(error)
        }

        const newUser = {
            name: req.body.name,
            adress: req.body.adress,
            age: req.body.age,
            phone: req.body.phone,
            email: req.body.username,
            password: createHash(password),
        }
        
        const newUserCreated = userDao.create(newUser)

        if(newUserCreated === error){
            return done(error)
        } else {
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
                subject: "Nuevo Usuario registrado",
                html: `<h1>Nuevo Usuario:</h1><span>${newUser}</span>`
            }
            
            try{
                const info = await transporter.sendMail(mailOptions)
                console.log(info)
            } catch (error) {
                console.log(error)
            }

            done(null, newUserCreated)
        }
    })
)

passport.use("login", new LocalStrategy((username, password, done) => {
        const findUser = userDao.readOneUser(username)

        if(!findUser){
            return done(null, false)
        }

        if(findUser == error){
            return done(error)
        }

        if (!isValidPassword(user, password)) {
            return done(null, false)
        }

        return done(null, findUser)
    })
)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    userDao.readById(id, done)
})



app.get("/api/productos-test", (req, res) => {
    const productos = [... new Array(5)].map((_, index) =>({
        id: index,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }))

    res.json(productos)
})

io.on("connection", async (socket) =>{
    console.log(`Nuevo Usuario Conectado ID: ${socket.id}`)

    const mensajes = await messageDao.readAll()
    socket.emit("mensajes", mensajes)
    socket.on("nuevoMensaje", async data => {
        await messageDao.create(data)
        const mensajes = await messageDao.readAll()
        io.sockets.emit("mensajes", mensajes)
    })
})


if(cluster.isMaster && isCluster) {
    console.log(`Cantidad de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)

    for(let i=0; i<numCPUs; i++) {
        cluster.fork()
    }

    cluster.on("exit", worker => {
        console.log("Worker", worker.process.pid, "died", new Date().toLocaleString())
        cluster.fork()
    })
}

else {
    app.get("/", (req,res) => {
        logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: response success`)
        res.send(`Servidor express en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
    })

    app.get("/api/randoms", (req,res) => {
        logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: response success`)
        res.send(`Servidor express en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
    })

    app.get("/info", compression(), (req,res) => {
        logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: response success`)

        res.send(`
            Servidor express en ${PORT} -<br>
            PID ${process.pid}<br>
            -${new Date().toLocaleString()}<br>
            Cantidad de procesadores: ${numCPUs}
            `)
    })

    app.get("/randoms", (req, res) => {
        logger.info(`PATH: ${req.path}, METHOD: ${req.method}, MESSAGE: response success`);
        res.send({ status: "ok"})
    })

    app.listen(PORT, err => {
        if(!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
    })
}
