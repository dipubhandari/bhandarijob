import mongoose from "mongoose"

const User_Schema = new mongoose.Schema({

    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    phone: { type: String, require: true },
    account: { type: String, default: 'jobseeker' },
    jobapplied: { type: Array },
    createdAt: { type: Date, default: Date.now() }
})

const JobSeeker_Model = mongoose.model('jobseeker', User_Schema)

export default JobSeeker_Model