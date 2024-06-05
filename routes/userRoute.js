const express = require('express');
const {
    getUser,
    getUsersPages,
    getUsers,
    createUser,
    createUsers,
    loginUser,
    updateUser, 
    deleteUser
} = require('../controller/userController');
const router = express.Router();
// const { checkAuth, checkRolesAuth } = require('../middelwares/authMiddleware');

router.get('/pages', getUsersPages); 
router.get('/:id', getUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.post('/register', createUser);
router.post('/registerall', createUsers);
router.post('/login', loginUser);
router.delete('/:id',  deleteUser);

module.exports = router;