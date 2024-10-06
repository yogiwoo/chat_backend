const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId;
const Schema=mongoose.Schema;

const privateChatModel=new Schema({
    me:{type:ObjectId,ref:"User"},
    they:{type:ObjectId,ref:"User"},
    latestMessage:{type:String,default:""},
},{
    timeStamps:true
})

const privateChat=mongoose.model('privateChat',privateChatModel)
module.exports=privateChat