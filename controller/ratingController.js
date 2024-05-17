const RatingModel = require('../models').Rating;
const { matchedData } = require('express-validator');
const { handleHttpError, handleErrorResponse } = require("../utils/handelError");

const getRatings = async (req, res) => {
  try {
    const ratings = await RatingModel.findAll();
    res.json({ ratings });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const getRating = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await RatingModel.findByPk(id);
    if (!rating) {
      handleErrorResponse(res, `No existe un rating con el id ${id}`, 404);
      return;
    }
    res.json({ rating });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const createRating = async (req, res) => {
  try {
    const { value, id_product } = req.body;
    const newRating = await RatingModel.create({
      value,
      id_product,
    });
    res.json(newRating);
  } catch (error) {
    handleHttpError(res, error);
  }
};

const updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { value, id_product } = req.body;
    const rating = await RatingModel.findByPk(id);
    if (!rating) {
      handleErrorResponse(res, `No existe un rating con el id ${id}`, 404);
      return;
    }
    if (value !== undefined) rating.value = value;
    if (id_product !== undefined) rating.id_product = id_product;
    await rating.save();
    res.json({
      msg: 'Rating actualizado.',
      data: rating,
    });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await RatingModel.findByPk(id);
    if (!rating) {
      handleErrorResponse(res, `No existe un rating con el id ${id}`, 404);
      return;
    }
    await rating.destroy();
    res.json({
      msg: 'Rating eliminado.',
      data: rating,
    });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const getRatingsByProduct = async (req, res) => {
    try {
        const { id_product } = req.params;
        console.log('Fetching ratings for product id:', id_product); // Agregar logging

        const ratings = await RatingModel.findAll({
            where: { id_product }
        });

        console.log('Ratings fetched:', ratings); // Agregar logging

        if (ratings.length === 0) {
            return res.status(404).json({
                msg: `No existen calificaciones para el producto con id ${id_product}`
            });
        }

        res.json({ ratings });
    } catch (error) {
        console.error('Error fetching ratings:', error); // Agregar logging
        handleHttpError(res, error);
    }
};

module.exports = {
  getRatings,
  getRating,
  createRating,
  updateRating,
  deleteRating,
  getRatingsByProduct
};
