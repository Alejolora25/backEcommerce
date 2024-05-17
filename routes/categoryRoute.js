const express = require('express');
const {
    getCategory,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controller/categoryController');
const router = express.Router();
const { checkAuth, checkRolesAuth } = require('../middelwares/authMiddleware');

router.get('/:id', getCategory);
router.get('/', getCategories);
router.put('/:id', updateCategory);
router.post('/', createCategory);
router.delete('/:id',  deleteCategory);

module.exports = router;