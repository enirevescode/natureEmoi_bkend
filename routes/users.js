
const UserModel = require('../models/user')
//const { sequelize, DataTypes } = require('sequelize')
// Récupération du routeur d'express
//let router = express.Router()



/**********************************/
/*** Routage de la ressource User */

exports.getAllUsers = (req, res, next) => {
    UserModel.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => next(err))
}

//module.exports = { UserModel }