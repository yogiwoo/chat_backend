const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId;
const Schema=mongoose.Schema;

const privateChatModel=new Schema({
    me:{type:ObjectId,ref:"User"},
    they:{type:ObjectId,ref:"User"},
    latestMessage:{type:ObjectId,ref:"Message"},
},{
    timeStamps:true
})

const privateChat=mongoose.Model('privateChat',privateChatModel)
module.exports=privateChat