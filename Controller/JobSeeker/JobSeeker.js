import bcrypt from 'bcryptjs';
import JobSeeker_Model from "../../model/JobSeeker.js"
import Employer_Model from "../../model/employer.js"
import jwt from 'jsonwebtoken';
import userValidator from 'email-validator';
import Apply_Model from '../../model/Apply_Model.js'

class JobSeekerController {

    static UserAccountCreation = async (req, res) => {

        // get data from user

        const { name, email, phone, password } = req.body

        // (if)
        // check data in the db if exitst or not
        const user = await (JobSeeker_Model.findOne({ email, password }) && Employer_Model.findOne({ email }))
        if (user) {
            res.send({ error_msg: 'Email used. Try New Email.' })
        }
        else {
            // const pasword = req.body.password

            const user_detail = await JobSeeker_Model.create({
                name,
                email,
                password
            })
            // await bcrypt.hash(req.body.password, 10)
            // generating the token
            // let token = jwt.sign({
            //     id: user_detail._id,
            //     email: email,
            // }, 'shhh', { expiresIn: '2h' })
            // user_detail.token = token,
            //     user_detail.password = null
            // if user not exist and token generated then 
            if (user_detail) {
                res.send({ user: user_detail, success: 'Account created Successfully' })
            }

        }

    }

    static User__Login = async (req, res) => {

        // get data from user

        const { email, password } = req.body
        // check data in the db if exitst or notawait
        // const employer = await (Employer_Model.findOne({ email, password }))
        const user2 = await JobSeeker_Model.findOne({ email, password })
        const user1 = await Employer_Model.findOne({ email, password })


        if (!(user2 || user1)) {


            res.send({ error_msg: 'Enter correct details...' })
        }
        else {
            res.send({ user: user1 || user2, success: 'Login Successful' })
        }
    }


    static Check__Login = async (req, res) => {

        const token = req.body.token

        const user1 = await JobSeeker_Model.findOne({ _id: token })
        const user2 = await Employer_Model.findOne({ _id: token })
        if (user1 || user2) {
            console.log('are login')
            res.send({ isLogin: true, user: user1 || user2 })
        }
        else {
            res.send({ isLogin: false, user: user1 || user2 })
        }
    }


    static AllJobSekeer = async (req, res) => {
        const user = await JobSeeker_Model.find()
        res.send(user)
    }
    static JobSeekerDetails = async (req, res) => {
        try {
            const user = await JobSeeker_Model.findOne({ _id: req.params.id })
            console.log(user)
            user.password = null
            user.account = null
            user.jobapplied = null

            res.send(user)
        } catch (error) {
            console.log(error)
        }
    }
    static UpdateJobSeekerDetail = async (req, res) => {
        try {
            const { _id, name, email } = req.body;
            console.log(_id)
            // validating 
            const validateEmail = userValidator.validate(email)

            if (!(name && email)) {
                res.send({ error_msg: "Enter all fields." })
            }
            else if (!(validateEmail)) {
                res.send({ error_msg: "Email is not valid" })
            }
            else {
                // checking if the user change anyting or not if not change 
                const findUser = await JobSeeker_Model.findOne({ email })

                if (findUser.name == name && findUser.email == email) {
                    res.send({ error_msg: "Your Updated Data is same..." })
                }
                else {
                    const update = await JobSeeker_Model.updateOne({ _id }, { $set: { name, email } },)
                    const user = await JobSeeker_Model.findOne({ _id });

                    const oldEmail = user.email
                    console.log(oldEmail)
                    // update the email in appplication also
                    const updateEmailApplied = await Apply_Model.updateMany({ email: oldEmail }, { email })
                    if (update && updateEmailApplied) { res.send({ success_msg: "updated" }) } else { res.send({ error_msg: "Sorry Try Again" }) }
                }

            }
        }
        catch (err) {
            res.send({ error_msg: "Something went Wrong" })
        }
    }
}

export default JobSeekerController