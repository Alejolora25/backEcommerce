const User = require('../models').User;
const { verifyToken } = require('../config/jwToken');

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const tokenData = await verifyToken(token);
        
        if (tokenData.id) {
            next();
        }
        if (!tokenData) {
            res.status(409);
            res.send({ error: 'Token invalido!' })
        }
    } catch (error) {
        console.log(error);
        res.status(409);
        res.send({ error: 'No hay Session!' })
    }
}

const checkRolesAuth = (roles) => async (req, res, next) => {
    try {
        const tokenAuth = req.headers.authorization.split(' ')[1];
        const tokenDataAuth = await verifyToken(tokenAuth);
        const userData = await User.findByPk(tokenDataAuth.id);
        if ([].concat(roles).includes(userData.id_role)) {
            next();
        } else {
            res.send({ error: 'No tienes permisos!' })
        }
    } catch (error) {
        console.log(error);
        res.status(409);
        res.send({ error: 'Comuniquese con el Administrador!' })
    }
}


module.exports = { checkAuth, checkRolesAuth };