const express = require('express');
const RoleModel = require('../models').Role;
const {
    handleHttpError, handleErrorResponse,
  } = require("../utils/handleError");

const getRoles = async (req, res) => {
    try {
        const roles = await RoleModel.findAll();
        res.json({ roles });
    } catch (error) {
        handleHttpError(res, error);
    }
};

const createRole = async (req, res) => {
    try {
        const { body } = req;
        const roleExists = await RoleModel.findOne({ where: { name_role: body.name_role } });
        if (roleExists) {
            handleErrorResponse(res, `Ya existe un rol de usuario con el nombre ${body.name_role}`, 401);
            return;            
        }
        const role = await RoleModel.create(body);
        res.json(role);
    } catch (error) {
        handleHttpError(res, error);
    }
};

const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await RoleModel.findByPk(id);
        if (!role) {
            handleErrorResponse(res, `No se encontró un rol de usuario con el ID ${id}`, 404);
            return;
        }
        res.json(role);
    } catch (error) {
        handleHttpError(res, error);
    }
};

const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const role = await RoleModel.findByPk(id);
        if (!role) {
            handleErrorResponse(res, `No se encontró un rol de usuario con el ID ${id}`, 404);
            return;
        }
        await role.update(body);
        res.json(role);
    } catch (error) {
        handleHttpError(res, error);
    }
};

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await RoleModel.findByPk(id);
        if (!role) {
            handleErrorResponse(res, `No se encontró un rol de usuario con el ID ${id}`, 404);
            return;
        }
        await role.destroy();
        res.json({ message: 'Rol de usuario eliminado exitosamente.' });
    } catch (error) {
        handleHttpError(res, error);
    }
};

module.exports = {
    getRoles,
    createRole,
    getRoleById,
    updateRole,
    deleteRole
};
