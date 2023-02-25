import mongoose from "mongoose"

const Friend_Schema = new mongoose.Schema({
    user: { type: String, require: true, unique: true },
    friend: { type: Array, require: true }
},
    { timestamps: true })

const Friend_Model = mongoose.model('friend', Friend_Schema)

export default Friend_Model