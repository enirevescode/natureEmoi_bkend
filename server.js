const express = require('express')
const morgan_logger = require('morgan')

const sequelize = require('sequelize')
const cors = require('cors')


const app = express()

/******IMPORT DE LA CONNECTION A LA DB */
let DB = require('./db.config')

/******IMPORT DEs modules de routage */
const user_router = require('./routes/users')
const plante_router = require('./routes/plantes')


    /* Les middleware */
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))

app.use(express.json())/*Pour parler en json*/
app.use(express.urlencoded({ extended: true }))


app.use(morgan_logger('dev'))



//Controle de connection avec bdd ou DB
DB.authenticate()
    .then(() => console.log('Database connection is OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
        console.log(`This serveur is running on port ${process.env.SERVER_PORT}. Have fun !`)
    })
})
    .catch(err => console.log('Database Error', err))