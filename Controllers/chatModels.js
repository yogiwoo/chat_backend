const chatModel=require("./../modals/chatModel")
const privateChat=require("./../modals/privateChat")
const messageCollection=require("./../modals/MessageModel")
const mongoose=require('mongoose')
const ObjectId=mongoose.Types.ObjectId;
//personal chat app
const createPrivateChat=async (req,res)=>{
    try{
        let params=new privateChat({
            me:ObjectId(req._id),
            they:ObjectId(req.query.userId),
            lastMessage:req.body.msg
        })
        let data =await params.save();
        if(data){
            return res.status(200).json({message:'No chat found with this person new chat session created'});
        }
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
    
}

//type and send the message 
const sendMessage= async(req,res)=>{
    //insert message alogn with the sender and receiver ids
    try{
        data=req.body;
        let data={
            sender:ObjectId(data.sender),
            reciever:ObjectId(data.reciever),
            chat:ObjectId(data.chatId),
            message:data.message
        }
        let saveMessage=await messageCollection.insertOne(data);
        if(saveMessage){
            return res.status(200).json({message:'Message send and saved'});
        }
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}
const loadAllPrevChats=async (req,res)=>{
    //list of all ppls with last msg
    //only lists chat session with older chat
    let allChatList=await this.privateChat.find({me:ObjectId(req.id)});
    if(allChatList.length>0){
        return res.status(200).json({message:'Message send and saved',allChatList});
    }
    else{
        return res.status(200).json({message:'Start a new conversation',allChatList});
    }
}
module.exports={
    createPrivateChat,
    sendMessage,
    loadAllPrevChats
};