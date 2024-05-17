const express = require('express');
const {
    getUser,
    getUsers,
    createUser,
    loginUser,
    updateUser, 
    deleteUser
} = require('../controller/userController');
const router = express.Router();
const { checkAuth, checkRolesAuth } = require('../middelwares/authMiddleware');

router.get('/:id', getUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.post('/register', createUser);
router.post('/login', loginUser);
router.delete('/:id',  deleteUser);

module.exports = router;