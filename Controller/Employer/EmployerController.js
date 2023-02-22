import Employer_Model from '../../model/employer.js';
import Jobseeker_Model from '../../model/JobSeeker.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Job_Model from '../../model/PostJob.js'
import JobSeeker_Model from '../../model/JobSeeker.js';

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
                const enc_code = await bcrypt.hash(req.body.password, 10)
                const user = await Employer_Model.create({
                    companyname,
                    email,
                    phone,
                    password: enc_code,
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

            const { companyname, email, phone, address } = req.body;
            if (!(companyname && phone && address && email)) {
                res.send({ error_msg: "Field is empty" })
            }
            else if (address.length < 3) {
                res.send({ error_msg: "Enter correct Address" })
            }
            else if (phone.length != 10) {
                res.send({ error_msg: "Enter correct Number" })
            }
            else {
                const _id = req.body.token;

                // if logo present in update this runs
                if (req.file) {
                    // updating the logo of the post too
                    const logo = req.file.filename
                    const update = await Employer_Model.updateOne({ _id }, {
                        companyname, address, phone, email, logo
                    })
                    const useremail = await Employer_Model.findOne({
                        _id: _id
                    })
                    // console.log(useremail.email)
                    const owneremail = useremail.email
                    const post = await Job_Model.updateMany({ owneremail }, { logo, owneremail, companyname, address })
                    if (update) {
                        console.log('updated')
                        res.send({ success_msg: "Updated Successfully" })
                    }
                    else {
                        console.log(' not updated')

                        res.send({ error_msg: "Something went wrong" })
                    }
                }

                // if notlogo present in update
                else {
                    const update = await Employer_Model.updateOne({ _id }, {
                        companyname, address, phone, email
                    })
                    const useremail = await Employer_Model.findOne({
                        _id: _id
                    })
                    const owneremail = useremail.email
                    console.log(owneremail)
                    const post = await Job_Model.updateMany({ owneremail }, { owneremail, companyname, address })
                    if (update) {
                        console.log('updated')
                        res.send({ success_msg: "Updated Successfully" })
                    }
                }


            }

        }
        catch (error) {

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


    // password change for employer and jobseeker also
    static ChangePassword = async (req, res) => {

        try {

            const { oldpassword, newpassword, account } = req.body
            console.log(req.body)
            // change password for employer
            if (account == 'employer') {
                // console.log('this works')
                // checking the password in the database
                const user = await Employer_Model.findOne({ _id: req.body.token })
                const oldpasswordhash = await bcrypt.compare(oldpassword, user.password)
                const newpasswordhash = await bcrypt.compare(newpassword, user.password)
                if (newpasswordhash) {
                    res.send({ error_msg: "New Password is same as old password." })
                }
                else if (!oldpasswordhash) {
                    res.send({ error_msg: "Old Password is wrong." })
                }
                else {
                    const enc_code = await bcrypt.hash(newpassword, 10)
                    const update = await Employer_Model.updateOne({ _id: req.body.token }, { password: enc_code })
                    if (update) {
                        res.send({ success_msg: "Password is changed" })
                    }
                }
            }  // password change for jobseeker
            else {
                // checking the password in the database
                const jobseeker_user = await JobSeeker_Model.findOne({ _id: req.body.token })
                const oldpasswordhash = await bcrypt.compare(oldpassword, jobseeker_user.password)
                const newpasswordhash = await bcrypt.compare(newpassword, jobseeker_user.password)
                if (newpasswordhash) {
                    res.send({ error_msg: "New Password is same as old password." })
                }
                else if (!oldpasswordhash) {
                    res.send({ error_msg: "Old Password is wrong." })
                }
                else {
                    const enc_code = await bcrypt.hash(newpassword, 10)
                    const update = await JobSeeker_Model.updateOne({ _id: req.body.token }, { password: enc_code })
                    if (update) {
                        res.send({ success_msg: "Password is changed" })
                    }
                }
            }

        }
        catch (error) {
            console.log(error)
            res.send({ error_msg: "Something Went Wrong" })
        }
    }
}

export default EmployerController