import bcrypt from 'bcryptjs';
import JobSeeker_Model from "../../model/JobSeeker.js"
import Employer_Model from "../../model/employer.js"
import jwt from 'jsonwebtoken';

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
                console.log('first')
                res.send({ user: user_detail, success: 'Account created Successfully' })
            }

        }

    }

    static User__Login = async (req, res) => {

        // get data from user

        const { email, password } = req.body
        console.log(req.body)
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

        console.log(token)

        const user1 = await JobSeeker_Model.findOne({ _id: token })
        const user2 = await Employer_Model.findOne({ _id: token })
        if (user1 || user2) {
            console.log(user1 || user2)

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
}

export default JobSeekerController