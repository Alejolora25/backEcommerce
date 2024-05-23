const ImageModel = require('../models').Image;
const {
    handleHttpError, handleErrorResponse,
} = require("../utils/handleError");

const getImages = async (req, res) => {
    const images = await ImageModel.findAll();
    res.json({ images });
}

const getImagesPages = async (req, res) => {
    const { page = 1 } = req.query;
    let size = 5;
    let options = {
        limit: size,
        offset: (page - 1) * (size)
    }
    const { count, rows } = await ImageModel.findAndCountAll(options);
    totalPages = Math.ceil(count / size);
    res.json({
        totalItems: count,
        totalPages: totalPages,
        currentPage: parseInt(page),
        images: rows
    });
}

const getImageById = async (req, res) => {
    try {
        const { id_product } = req.params;
        console.log(`ID del producto: ${id_product}`);

        if (!id_product) {
            return res.status(400).json({ error: 'El id_product es requerido' });
        }

        const images = await ImageModel.findAll({ where: { id_product } });

        if (!images || images.length === 0) {
            return res.status(404).json({ error: `No existen imágenes con el id_product ${id_product}` });
        }

        res.json({ images });
    } catch (error) {
        console.error(`Error al obtener las imágenes para el id_product ${id_product}: `, error);
        res.status(500).json({ error: 'Error al obtener las imágenes' });
    }
};



const createImage = async (req, res) => {
    try {
        const { body } = req;
        const existImage = await ImageModel.findOne({ where: { url_image: body.url_image } });
        if (existImage) {
            handleErrorResponse(res, `Ya existe una imagen con el url ${body.url_image}`, 401);
            return;
        }
        const newImage = await ImageModel.create({
            url_image: body.url_image,
            id_product: body.id_product,
        });
        res.json(newImage);
    } catch (error) {
        handleHttpError(res, error);
    }
};

const updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { url_image, id_product } = req.body;
        const image = await ImageModel.findByPk(id);
        if (!image) {
            handleErrorResponse(res, `No existe una imagen con el id ${id}`, 401);
            return;
        }
        if (url_image) image.url_image = url_image;
        if (id_product) image.id_product = id_product;
        await image.save();
        res.json({
            msg: 'Imagen actualizada.',
            data: image,
        });
    } catch (e) {
        handleHttpError(res, e);
    }
};

const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await ImageModel.findByPk(id);
        if (!image) {
            handleErrorResponse(res, ` No existe una imagen con el id ${id}`, 401);
            return;
        }
        image.isActive = false;
        await image.destroy();
        res.json({
            msg: 'Imagen eliminada.',
            data: image,
        });
    } catch (e) {
        handleHttpError(res, e);
    }
};

module.exports = {
    getImages,
    getImagesPages,
    getImageById,
    createImage,
    updateImage,
    deleteImage
}