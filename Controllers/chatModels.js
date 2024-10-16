const chatModel = require("./../modals/chatModel")
const privateChat = require("./../modals/privateChat")
const messageCollection = require("./../modals/MessageModel")
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
//personal chat app
const createPrivateChat = async (req, res) => {
   // try {
   let data=req.body
        let params = new privateChat({
            me: new ObjectId(data.me),
            they:new ObjectId(data.they),
            lastMessage: req.body.msg
        })
        let x = await params.save();
        if (x) {
            return res.status(200).json({ message: 'No chat found with this person new chat session created' });
        }
    // } catch (error) {
    //     return res.status(500).json({ message: "Internal server error" })
    // }

}

//type and send the message 
const sendMessage = async (req, res) => {
    //insert message alogn with the sender and receiver ids
    //try {
        let data = req.body;
        console.log(data)
        let params = {
            sender: new ObjectId(data.sender),
            reciever: new ObjectId(data.reciever),
            chat: new ObjectId(data.chatId),
            message: data.message
        }
        let saveMessage = await messageCollection.create(params);
        if (saveMessage) {
            return res.status(200).json({ message: 'Message sent and saved' ,data:saveMessage});
        }
    // } catch (error) {
    //     return res.status(500).json({ message: "Internal server error" })
    // }
}
const loadAllPrevChats = async (req, res) => {
    //list of all ppls with last msg
    //only lists chat session with older chat
    let data2=[]
    let allChatList = await privateChat.find({ me:new ObjectId(req.query.userId) }).populate('they','name');
    if (allChatList.length > 0) {
       
         data2=allChatList.map((itm)=>{
            return{
                chatId:itm._id,
                myId:itm.me,
                theirId:itm.they._id,
                theirName:itm.they.name,
                lastMessage:itm.latestMessage
            }
        })
        return res.status(200).json({ message: 'Message send and saved', data2 });
    }
    else {
        return res.status(200).json({ message: 'Start a new conversation', data2 });
    }
}
const fetchMyMsg=async (req,res)=>{
    const chatId=new ObjectId(req.query.chatId);
    const myChat=await messageCollection.find({chat:new ObjectId(chatId)})
    .populate('sender','name')
    .populate('reciever','name')
    .sort({_id:-1});
    if(myChat.length>0){
        res.status(200).json({message:"messages",myChat});
    }
    else{
        res.status(400).json({message:"no messages"});
    }
}
module.exports = {  
    createPrivateChat,
    sendMessage,
    loadAllPrevChats,
    fetchMyMsg
};