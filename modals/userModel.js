const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId;
const Schema=mongoose.Schema;

const userModel=new Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},

},{
    timestamps:true
})

const user=mongoose.model('User',userModel);
module.exports=user;