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
        let params = {
            sender: new ObjectId(data.sender),
            reciever: new ObjectId(data.reciever),
            chat: new ObjectId(data.chatId),
            message: data.message
        }
        let saveMessage = await messageCollection.create(params);
        if (saveMessage) {
            return res.status(200).json({ message: 'Message sent and saved' });
        }
    // } catch (error) {
    //     return res.status(500).json({ message: "Internal server error" })
    // }
}
const loadAllPrevChats = async (req, res) => {
    //list of all ppls with last msg
    //only lists chat session with older chat
    let allChatList = await privateChat.find({ me: new ObjectId(req.query.userId) }).populate('they','name');
    if (allChatList.length > 0) {
        return res.status(200).json({ message: 'Message send and saved', allChatList });
    }
    else {
        return res.status(200).json({ message: 'Start a new conversation', allChatList });
    }
}
module.exports = {
    createPrivateChat,
    sendMessage,
    loadAllPrevChats
};