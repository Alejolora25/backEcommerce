const express = require('express');
const {
    getImages,
    getImagesPages,
    getImage,
    createImage,
    updateImage, 
    deleteImage
} = require('../controller/imageController');
const router = express.Router();
const { checkAuth, checkRolesAuth } = require('../middelwares/authMiddleware');

router.get('/:id', getImage);
//router.get('/', getImagesPages);
router.get('/', getImages);
router.post('/',  createImage);
router.put('/:id',  updateImage);
router.delete('/:id',  deleteImage);
// router.post('/login', validatorLoginUser, loginUser);

module.exports = router;