const { Order, User, Product, OrderProduct } = require('../models');
const {
  handleHttpError,
  handleErrorResponse,
} = require("../utils/handleError");

// Controlador createOrder
const createOrder = async (req, res) => {
    try {
      const { id_user, products, ...orderDetails } = req.body;
  
      const order = await Order.create({
        id_user,
        ...orderDetails
      });
  
      for (const product of products) {
        await OrderProduct.create({
          id_order: order.id,
          id_product: product.id_product,
          quantity: product.quantity
        });
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
      handleErrorResponse(res, 'Order not found', 404);
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
      handleErrorResponse(res, 'No orders found for this user', 404);
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
