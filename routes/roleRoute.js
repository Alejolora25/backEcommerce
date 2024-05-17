const express = require('express');
const {
    getRoles,
    createRole,
} = require('../controller/roleController');
const router = express.Router();
const { checkAuth, checkRolesAuth } = require('../middelwares/authMiddleware');

router.get('/', getRoles);
router.post('/', createRole);

module.exports = router;