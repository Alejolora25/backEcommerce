const express = require('express');
const {
    getProducts,
    getProductsPages,
    getProduct,
    createProduct,
    updateProduct, 
    deleteProduct
} = require('../controller/productController');
const router = express.Router();
const { checkAuth, checkRolesAuth } = require('../middelwares/authMiddleware');

router.get('/:id', getProduct);
router.get('/', getProductsPages);
router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id',  updateProduct);
router.delete('/:id',  deleteProduct);

module.exports = router; 