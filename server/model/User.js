import mongoose from "mongoose"

const User_Schema = new mongoose.Schema({

    name: { type: String, require: true },
    email: { type: String, require: true },
    pasword: { type: String, require: true },
    phone: { type: String, require: true },
    createdAt: { type: Date, default: Date.now() }
})

const User_Model = mongoose.model('user', User_Schema)

export default User_Model