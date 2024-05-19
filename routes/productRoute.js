const express = require('express');
const {
    getProducts,
    getProductsPages,
    getProduct,
    createProduct,
    updateProduct, 
    deleteProduct,
    getProductsByCategory
} = require('../controller/productController');
const router = express.Router();
const { checkAuth, checkRolesAuth } = require('../middelwares/authMiddleware');


router.get('/pages', getProductsPages); 
router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/category/:categoryId', getProductsByCategory);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct); 

module.exports = router; 