import mongoose from "mongoose"

const Employer_Schema = new mongoose.Schema({
    companyname: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    account: { type: String, default: 'employer' },
    createdAt: { type: Date, default: Date.now() }
})

const Employer_Model = mongoose.model('employer', Employer_Schema)

export default Employer_Model