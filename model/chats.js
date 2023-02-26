import mongoose from "mongoose"

const Chat_Schema = new mongoose.Schema({
    chatId: { type: String },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
    seen: { type: String, default:false},
    
},
    { timestamps: true }
)

const Chat_Model = mongoose.model('chats', Chat_Schema)

export default Chat_Model