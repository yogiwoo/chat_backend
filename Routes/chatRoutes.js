const express=require('express')
const router=express.Router();
const {createPrivateChat,sendMessage,loadAllPrevChats}=require('./../Controllers/chatModels')
router.post('/createPrivateChat',createPrivateChat)
router.post('/sendMessage',sendMessage);
router.get('/loadChatSessions',loadAllPrevChats)

module.exports=router;