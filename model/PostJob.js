import mongoose from "mongoose"

const Job_Schema = new mongoose.Schema({
    owneremail: { type: String },
    companyname: { type: String },
    logo: { type: String },
    address: { type: String },
    position: { type: String, require: true },
    applydate: { type: Date, require: true },
    vacancy: { type: Number, require: true },
    salary: { type: Number, require: false },
    experience: { type: String, require: true },
    category: { type: String, require: true },
    education: { type: String, require: true },
    jobdescription: { type: String, require: true },
    skills: { type: Array },
    requirements: { type: Array },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }

})

const Job_Model = mongoose.model('jobpost', Job_Schema)

export default Job_Model