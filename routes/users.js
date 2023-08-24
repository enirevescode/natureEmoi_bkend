
const UserModel = require('../models/user')


/**********************************/
/*** Routage de la ressource User */

exports.getAllUsers = (req, res, next) => {
    UserModel.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => next(err))
}

//module.exports = { UserModel }