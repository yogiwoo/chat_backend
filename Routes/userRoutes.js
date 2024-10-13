const express=require('express')
const router=express.Router();
const {loginController,registerController,searchUser}=require('./../Controllers/userModels')
router.post('/login',loginController)
router.post('/register',registerController);
router.get("/search",searchUser)
module.exports=router;