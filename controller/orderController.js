const { Order, User, Product, OrderProduct } = require('../models');
const { handleHttpError, handleErrorResponse } = require("../utils/handleError");

// Controlador createOrder
const createOrder = async (req, res) => {
  try {
    const { id_user, products, ...orderDetails } = req.body;

    // Verificar que el usuario existe
    const user = await User.findByPk(id_user);
    if (!user) {
      return handleErrorResponse(res, `El usuario con id ${id_user} no existe`, 404);
    }

    // Verificar que los productos existen y tienen suficiente cantidad
    for (const product of products) {
      const prod = await Product.findByPk(product.id_product);
      if (!prod) {
        return handleErrorResponse(res, `Producto con id ${product.id_product} no existe`, 404);
      }
      if (prod.quantity_product < product.quantity) {
        return handleErrorResponse(res, `Producto con id ${product.id_product} no cuenta con suficiente stock`, 400);
      }
    }

    // Crear la orden
    const order = await Order.create({
      id_user,
      ...orderDetails
    });

    // Crear registros en la tabla intermedia OrderProducts y actualizar la cantidad de productos
    for (const product of products) {
      await OrderProduct.create({
        id_order: order.id,
        id_product: product.id_product,
        quantity: product.quantity
      });

      // Actualizar la cantidad del producto en stock
      const prod = await Product.findByPk(product.id_product);
      prod.quantity_product -= product.quantity;
      await prod.save();
    }

    res.status(201).json(order);
  } catch (error) {
    handleHttpError(res, error);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ['name_user', 'email'] },
        {
          model: Product,
          through: { attributes: ['quantity'] } 
        }
      ]
    });
    res.status(200).json(orders);
  } catch (error) {
    handleHttpError(res, error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        { model: User, attributes: ['name_user', 'email'] },
        { model: Product, through: { attributes: ['quantity'] } }
      ]
    });

    if (!order) {
      handleErrorResponse(res, 'Orden no encontrada', 404);
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    handleHttpError(res, error);
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const { id_user } = req.params;
    const orders = await Order.findAll({
      where: { id_user },
      include: [
        { model: User, attributes: ['name_user', 'email'] },
        { model: Product, through: { attributes: ['quantity'] } }
      ]
    });

    if (!orders.length) {
      handleErrorResponse(res, 'No se encontraron órdenes para este usuario', 404);
      return;
    }

    res.status(200).json(orders);
  } catch (error) {
    handleHttpError(res, error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId
};
