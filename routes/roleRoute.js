const express = require('express');
const {
    getRoles,
    createRole,
    updateRole,
    deleteRole
} = require('../controller/roleController');
const router = express.Router();
const { checkAuth, checkRolesAuth } = require('../middelwares/authMiddleware');

router.get('/', getRoles);
router.put('/:id', updateRole);
router.post('/', createRole);
router.delete('/:id', deleteRole);

module.exports = router;