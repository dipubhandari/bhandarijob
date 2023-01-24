import mongoose from "mongoose"

const Employer_Schema = new mongoose.Schema({
    companyname: { type: String, require: true },
    email: { type: String, require: true },
    description: { type: String, require: true },
    logo: { type: String },
    password: { type: String, require: true },
    phone: { type: String, require: true },
    account:{type:String,default:'employer'},
    createdAt: { type: Date, default: Date.now() }
})

const Employer_Model = mongoose.model('employer', Employer_Schema)

export default Employer_Model