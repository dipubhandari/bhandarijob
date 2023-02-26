import Employer_Model from "../model/employer.js"
import JobSeeker_Model from "../model/JobSeeker.js"

// functin to fetch user from db based on id 
const findUser = async (field, id) => {
    const user = await (JobSeeker_Model.findOne({ [field]: id }) || Employer_Model.findOne({ [field]: id }))
    console.log(user)
    return user
}

export { findUser } 