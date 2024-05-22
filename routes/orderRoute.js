const express = require('express');
const {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUserId
} = require('../controller/orderController');
const router = express.Router();
const { checkAuth, checkRolesAuth } = require('../middelwares/authMiddleware');

router.post('/', createOrder); // Crear una orden de compra
router.get('/', getAllOrders); // Consultar todas las órdenes de compra
router.get('/:id', getOrderById); // Consultar una orden de compra por ID
router.get('/user/:id_user', getOrdersByUserId); // Consultar órdenes de compra por ID de usuario

module.exports = router;
