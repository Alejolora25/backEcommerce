const RoleModel = require('../models').Role;
const {
    handleHttpError, handleErrorResponse,
  } = require("../utils/handleError");

const getRoles = async (req, res) => {
    const role = await RoleModel.findAll();
    res.json({ role });
}

const createRole = async (req, res) => {
    try {
        const { body } = req;
        const roleUser = await RoleModel.findOne({where: {name_role: body.name_role}});
        if (roleUser) {
            handleErrorResponse(res, `ya existe un role de usuario ${body.name_role}`, 401);
            return;            
        }
        const role = new RoleModel(body);
        await role.save();
        res.json(role);
    } catch (error) {
        handleHttpError(res, error);
    }
};

module.exports = {
    getRoles,
    createRole, 
}