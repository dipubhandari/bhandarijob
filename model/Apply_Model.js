import mongoose from "mongoose"

const Apply_Schema = new mongoose.Schema({

    name: { type: String, require: true },
    owner: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, default: 1 },
    resume: { type: Buffer, require: true },
    appliedjob: { type: String, require: true },
    createdAt: { type: Date, default: Date.now() },
    status: { type: String, default: 'pending' }
})

const Apply_Model = mongoose.model('apply', Apply_Schema)

export default Apply_Model
