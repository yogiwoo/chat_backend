const express=require('express')
const router=express.Router();
const {createPrivateChat,sendMessage,loadAllPrevChats,fetchMyMsg}=require('./../Controllers/chatModels')
router.post('/createPrivateChat',createPrivateChat)
router.post('/sendMessage',sendMessage);
router.get('/loadChatSessions',loadAllPrevChats) //load all conversations with friends lists
router.get('/loadMessages',fetchMyMsg)
module.exports=router;