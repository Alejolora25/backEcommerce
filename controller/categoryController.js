const CategoryModel = require('../models').Category;
const {
    handleHttpError, handleErrorResponse,
} = require("../utils/handelError");

const getCategories = async (req, res) => {
    const categories = await CategoryModel.findAll();
    res.json({ categories });
}

const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findByPk(id);
        if (!category) {
            handleErrorResponse(res, ` No existe una categoria con el id ${id}`, 401);
            return;
        }
        res.json({ category });
    } catch (e) {
        handleHttpError(res, e);
    }
}

const createCategory = async (req, res) => {
    try {
        const { body } = req;
        const existCategory = await CategoryModel.findOne({ where: { name_category: body.name_category } });
        if (existCategory) {
            handleErrorResponse(res, `Ya existe un usuario con el nombre ${body.name_category}`, 401);
            return;
        }
        const newCategory = await CategoryModel.create({
            name_category: body.name_category,
        });
        res.json(newCategory);
    } catch (error) {
        handleHttpError(res, error);
    }
};


const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_category} = req.body;
        const category = await CategoryModel.findByPk(id);
        if (!category) {
            handleErrorResponse(res, `No existe una categoria con el id: ${id}`, 401);
            return;
        }
        if (name_category) category.name_category = name_category;
        await category.save();
        res.json({
            msg: 'Categoria actualizada.',
            data: category,
        });
    } catch (e) {
        handleHttpError(res, e);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findByPk(id);
        if (!category) {
            handleErrorResponse(res, `No existe una categoria con el id: ${id}`, 401);
            return;
        }
        await category.destroy();

        res.json({
            msg: 'Categoria Eliminada.',
            data: category,
        });
    } catch (e) {
        handleHttpError(res, e);
    }
};

module.exports = {
    getCategory,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}