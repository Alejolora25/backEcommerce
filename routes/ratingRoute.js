const express = require('express');
const router = express.Router();
const ratingController = require('../controller/ratingController');
const { checkAuth, checkRolesAuth } = require('../middelwares/authMiddleware');

router.get('/', ratingController.getRatings);
router.get('/:id', ratingController.getRating);
router.get('/product/:id_product', ratingController.getRatingsByProduct); 
router.post('/', ratingController.createRating);
router.put('/:id', ratingController.updateRating);
router.delete('/:id', ratingController.deleteRating);

module.exports = router;