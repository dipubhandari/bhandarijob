import mongoose from "mongoose"

const Apply_Schema = new mongoose.Schema({

    name: { type: String, required: true },
    owner: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: 1 },
    resume: { type: Buffer, required: true },
    appliedjob: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    status: { type: String, default: 'pending' }
})

const Apply_Model = mongoose.model('apply', Apply_Schema)

export default Apply_Model
