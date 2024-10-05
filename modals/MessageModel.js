const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId;
const Schema=mongoose.Schema;

const messageModel=new Schema({
    sender:{type:ObjectId,ref:'User'},
    reciever:{type:ObjectId,ref:'User'},
    chat:{type:ObjectId,ref:'Chat'},
    message:{type:String,default:""}
},{
    timestamps:true
})

const message=mongoose.Model('Message',messageModel);
module.exports=message;