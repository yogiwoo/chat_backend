const jwt=require('jsonwebtoken');
const env=require('dotenv');
const secret=process.env.secret
const generateToken=(id)=>{
    return jwt.sign({id},secret,{expiresIn:"30d"})
}

module.exports=generateToken;