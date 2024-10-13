const express=require('express');
const userModel=require("./../modals/userModel")
const expAsync=require('express-async-handler')
const generateToken=require('./../Controllers/Config/generateToken')

const loginController = expAsync(async (req, res) => {
    console.log("hello")
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json('Email and password are required');
    }

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).json({message:"User not found"});
    }

    if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password" });
    }
    //add bcrypt
    // If login is successful, generate a token
    const token = generateToken(user._id);
    const response = {
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        token
    };

    return res.status(200).json(response);
});

const registerController = expAsync(async (req, res) => {
    console.log("registers")
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json('Something is missing');
    }

    let user = await userModel.findOne({ email: email });
    if (user) {
        return res.status(400).json('Email is already in use');
    }

    let userName = await userModel.findOne({ name: name });
    if (userName) {
        return res.status(400).json('Username is already taken');
    }

    // Create user
    const usermode = await userModel.create({ name, email, password });
    if (usermode) {
        const response = {
            _id: usermode._id,
            email: usermode.email,
            name: usermode.name,
            isAdmin: usermode.isAdmin,
            token: generateToken(usermode._id)
        };
        return res.status(200).json({ message: 'Welcome', user: response });
    }
});

const searchUser=expAsync(async (req,res)=>{
    const name=req.query.name;
    let users=await userModel.find({name: {
        $regex: "^" + req.query.string,
        $options: "i"
    }})
    if(users.length>0){
        res.status(200).json({"message":"users",users:users})
    }
})


module.exports={loginController,registerController,searchUser}