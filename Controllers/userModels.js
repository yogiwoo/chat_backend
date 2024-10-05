const express=require('express');
const userModel=require("./../modals/userModel")
const expAsync=require('express-async-handler')
const generateToken=require('./../Controllers/Config/generateToken')

const loginController = expAsync(async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json('Email and password are required');
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).json('Invalid email or password');
    }

    // Direct password comparison (not recommended for production)
    if (user.password !== password) {
        return res.status(401).json('Invalid email or password');
    }

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


module.exports={loginController,registerController}