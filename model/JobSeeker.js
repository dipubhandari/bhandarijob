import mongoose from "mongoose"

const User_Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    account: { type: String, default: 'jobseeker' },
    jobapplied: { type: Array },
    createdAt: { type: Date, default: Date.now() }
})

const JobSeeker_Model = mongoose.model('jobseeker', User_Schema)

export default JobSeeker_Model