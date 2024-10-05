const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId;
const Schema=mongoose.Schema;

const chatModel=new Schema({
    chatName:{type:String},
    isGroupChat:{type:String},
    users:[
        {type:ObjectId,ref:'User'}
    ],
    latestMessage:{type:ObjectId,ref:"Message"},
    groupAdmin:{type:ObjectId,ref:'User'}
},{
    timeStamps:true
})

const chat=mongoose.Model('Chat',chatModel)
module.exports=chat