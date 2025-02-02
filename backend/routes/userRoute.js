const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');
const { verifyUser } = require('../middlewares/authMiddleware'); 

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/', verifyUser, allUsers); 

module.exports = router;
