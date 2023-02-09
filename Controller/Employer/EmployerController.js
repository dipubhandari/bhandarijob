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

    //    company details for  user detail update pag

    // updating the user detail
    static UpdateCompanyDetail = async (req, res) => {
        try {
            // getting the details from
            const { companyname, email, phone, password, address } = req.body;
            const avatar = req.file.filename

            const _id = req.body.token;
            console.log(_id)
            console.log(req.body)
            console.log(avatar)
            const update = await Employer_Model.findByIdUpdate(_id, {
                companyname, address, phone, password, email
            })
            if (update) {
                console.log("Updated Successfuly...")
            }
            else {

            }
        } catch (error) {

        }
    }
    static CompanyDetail = async (req, res) => {
        try {
            //    getting id from frontend
            const id = req.params.id
            const user = await Employer_Model.findOne({ _id: id })

            if (user) {
                res.send(user)
            }
            else {
                res.send('Error')
            }

        } catch (error) {

        }
    }


    // employer api
    static AllEmployer = async (req, res) => {
        const user = await Employer_Model.find()
        res.send(user)
    }

}

export default EmployerController