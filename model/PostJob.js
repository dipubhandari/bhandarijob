import mongoose from "mongoose"

const Job_Schema = new mongoose.Schema({
    owneremail: { type: String },
    companyname: { type: String },
    logo: { type: String },
    address: { type: String },
    position: { type: String, required: true },
    applydate: { type: Date, required: true },
    vacancy: { type: Number, required: true },
    salary: { type: Number, required: false },
    experience: { type: String, required: true },
    category: { type: String, required: true },
    education: { type: String, required: true },
    jobdescription: { type: String, required: true },
    skills: { type: Array },
    requirements: { type: Array },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }

})

const Job_Model = mongoose.model('jobpost', Job_Schema)

export default Job_Model