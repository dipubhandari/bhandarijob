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
        // check data in the db if exitst or not
        // const employer = await (Employer_Model.findOne({ email, password }))
        const user = await (JobSeeker_Model.findOne({ email, password }) && Employer_Model.findOne({ email, password }))
        if (!(user)) {
            console.log('Details donot match')
            res.status(400).send({ error_msg: 'Enter Correct Details' })
        }
        else {

            // Comparing the password in database with hash
            // const passwormatched = await bcrypt.compare(password, user.pasword)
            // if (user && passwormatched) {

            //     let token = jwt.sign({
            //         id: user._id,

            //     }, 'shhh', { expiresIn: '2h' })
            //     user.token = token,
            //         user.password = null
            //     const options = {
            //         expires: new Date(Date.now() + 12 * 24 * 60 * 60),
            //         httpOnly: true
            //     }
            //     res.cookie('token', token, options).json({
            //         success: true,
            //         token,
            //         user
            //     }).catch((err) => {
            //         console.log(err)
            //     })
            // }
            // else {
            res.send({ user: user, success: 'Login Successful' })


        }

    }



    static Check__Login = async (req, res) => {
        const { email, password } = req.body
        const user = await (JobSeeker_Model.findOne({ email, password }) && Employer_Model.findOne({ email, password }))
        if (user) {
            res.send(true)
        }
        else {
            res.send(false)
        }
    }


    static AllJobSekeer = async (req, res) => {
        const user = await JobSeeker_Model.find()
        res.send(user)
    }
}

export default JobSeekerController