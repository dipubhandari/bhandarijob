import mongoose from "mongoose"

const Friend_Schema = new mongoose.Schema({
    user: { type: String, required: true, unique: true },
    friend: { type: Array, required: true }
},
    { timestamps: true })

const Friend_Model = mongoose.model('friend', Friend_Schema)

export default Friend_Model