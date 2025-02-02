const express = require('express');
const { verifyUser } = require('../middlewares/authMiddleware');
const { sendMessages, fetchMessages } = require('../controllers/messageControllers');
const router=express.Router();

router.route('/').post(verifyUser,sendMessages);
router.route('/:chatId').get(verifyUser,fetchMessages);

module.exports = router;