import mongoose from "mongoose"

const Chat_Schema = new mongoose.Schema({
    chatId: { type: String },
    sender: { type: String, require: true },
    receiver: { type: String, require: true },
    message: { type: String, require: true }
},
    { timestamps: true }
)

const Chat_Model = mongoose.model('chats', Chat_Schema)

export default Chat_Model