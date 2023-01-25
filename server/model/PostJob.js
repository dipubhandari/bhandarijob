import mongoose from "mongoose"

const Job_Schema = new mongoose.Schema({

    position: { type: String, require: true },
    applydate: { type: Date, require: true },
    vacancy: { type: Number, require: true },
    salary: { type: Number, require: false },
    experience: { type: String, require: true },
    category: { type: String, require: true },
    education: { type: String, require: true },
    description: { type: String, require: true },
    skills: { type: Array },
    requirements: { type: Array },
    createdAt: { type: Date, default: Date.now() }

})

const Job_Model = mongoose.model('jobpost', Job_Schema)

export default Job_Model