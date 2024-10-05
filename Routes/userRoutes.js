const express=require('express')
const router=express.Router();
const {loginController,registerController}=require('./../Controllers/userModels')
router.post('/login',loginController)
router.post('/register',registerController);

module.exports=router;