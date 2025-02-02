const express = require('express');
const {verifyUser} = require('../middlewares/authMiddleware');
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controllers/chatControllers');

const router=express.Router();

router.post('/', verifyUser,accessChat);
router.get('/', verifyUser,fetchChats);
router.post('/group',verifyUser,createGroupChat);
router.post('/rename',verifyUser,renameGroup);
router.post('/remove',verifyUser,removeFromGroup);
router.post('/add',verifyUser,addToGroup);

module.exports = router;