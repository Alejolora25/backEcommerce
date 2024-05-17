const ProductModel = require('../models').Product;
const {
    handleHttpError, handleErrorResponse,
} = require("../utils/handleError");

const getProducts = async (req, res) => {
    const products = await ProductModel.findAll();
    res.json({ products });
}
const getProductsPages = async (req, res) => {
    const { page = 1 } = req.query;
    let size = 3;
    let options = {
        limit: size,
        offset: (page - 1) * (size)
    }
    const { count, rows } = await ProductModel.findAndCountAll(options);
    totalPages = Math.ceil(count / size);
    res.json({
        totalItems: count,
        totalPages: totalPages,
        currentPage: parseInt(page),
        products: rows
    });
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findByPk(id);
        if (!product) {
            handleErrorResponse(res, ` No existe una producto con el id ${id}`, 401);
            return;
        }
        res.json({ product });
    } catch (e) {
        handleHttpError(res, e);
    }
}

const createProduct = async (req, res) => {
    try {
        const { body } = req;
        const existProduct = await ProductModel.findOne({ where: { name_product: body.name_product } });
        if (existProduct) {
            handleErrorResponse(res, `Ya existe un producto con el nombre ${body.name_product}`, 401);
            return;
        }
        const newProduct = await ProductModel.create({
            name_product: body.name_product,
            price_product: body.price_product,
            quantity_product: body.quantity_product,
            description: body.description,
            id_category: body.id_category,
        });
        res.json(newProduct);
    } catch (error) {
        handleHttpError(res, error);
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_product, price_product, quantity_product, description, id_category } = req.body;
        const product = await ProductModel.findByPk(id);
        if (!product) {
            handleErrorResponse(res, `No existe un producto con el id ${id}`, 401);
            return;
        }
        if (name_product) product.name_product = name_product;
        if (price_product) product.price_product = price_product;
        if (quantity_product) product.quantity_product = quantity_product;
        if (name_product) product.name_product = name_product;
        if (description) product.description = description;
        if (id_category) product.id_category = id_category;
        await product.save();
        res.json({
            msg: 'Usuario desactivado.',
            data: product,
        });
    } catch (e) {
        handleHttpError(res, e);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findByPk(id);
        if (!product) {
            handleErrorResponse(res, ` No existe un usuario con el id ${id}`, 401);
            return;
        }
        product.isActive = false;
        await product.save();
        res.json({
            msg: 'Usuario desactivado.',
            data: product,
        });
    } catch (e) {
        handleHttpError(res, e);
    }
};

module.exports = {
    getProducts,
    getProductsPages,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}