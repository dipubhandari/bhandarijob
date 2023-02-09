import Employer_Model from '../../model/employer.js';

import Jobseeker_Model from '../../model/JobSeeker.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


class EmployerController {

    static UserAccountCreation = async (req, res) => {

        //  getting the input from the frontend
        const { companyname, address, email, phone, password, description } = req.body

        // validation
        if (!(companyname && email && phone && password && description && address)) {
            res.send({ error_msg: 'Please enter all the credential...' })
        }
        else {
            //    checking the email present in db of both jobseeker and employ
            const user1 = await Jobseeker_Model.findOne({ email })
            const user2 = await Employer_Model.findOne({ email })

            if (user1 || user2) {
                res.send({ error_msg: 'Email already exist' })
            }
            else {

                const user = await Employer_Model.create({
                    companyname,
                    email,
                    phone,
                    password,
                    address,
                    description,
                    logo: req.file.filename
                })
                if (user) {
                    res.send({ success: 'Account Created Succesfully' })
                }
            }

        }

    }

    // employer api
    static AllEmployer = async (req, res) => {
        const user = await Employer_Model.find()
        res.send(user)
    }

}

export default EmployerController