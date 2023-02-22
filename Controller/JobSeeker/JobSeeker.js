import bcrypt from 'bcryptjs';
import JobSeeker_Model from "../../model/JobSeeker.js"
import Employer_Model from "../../model/employer.js"
import jwt from 'jsonwebtoken';
import userValidator from 'email-validator';
import Apply_Model from '../../model/Apply_Model.js'

class JobSeekerController {

    static UserAccountCreation = async (req, res) => {


        try {
            // get data from user
            const { name, email, phone, password } = req.body
            const validateEmail = userValidator.validate(email)
            // valida email caine vane
            if (!validateEmail) {
                res.send({ error_msg: "Email is not vaild" })
            }
            // valid email xa vane
            else {
                // check data in the db if exitst or not
                const checkInJobFinder = await (JobSeeker_Model.findOne({ email }))
                const checkInEmployer = await (Employer_Model.findOne({ email }))
                if (checkInJobFinder || checkInEmployer) {
                    res.send({ error_msg: 'Email used. Try New Email.' })
                }
                else {
                    const enc_code = await bcrypt.hash(req.body.password, 10)
                    const user_detail = await JobSeeker_Model.create({
                        name,
                        email,
                        password: enc_code,
                        phone
                    })
                    const token = jwt.sign({ userId: user_detail._id }, process.env.secrete_key, { expiresIn: '17d' })
                    user_detail.token = token
                    user_detail.password = null
                    user_detail.jobapplied = null
                    // if user not exist and token generated then
                    if (user_detail) {
                        res.send({ token, user: user_detail, success: 'Account created Successfully' })
                    }

                }
            }
        }
        catch (error) {

        }

    }

    static User__Login = async (req, res) => {
        try {
            // get data from user
            const { email, password } = req.body
            // check data in the db if exitst or not
            const user = await JobSeeker_Model.findOne({ email }) || await Employer_Model.findOne({ email })
            //   user exist gardaina vane
            if (!user) {
                res.send({ error_msg: 'Enter correct details...' })
            }
            // user exist garxa vane compare 
            else {
                const hash = await bcrypt.compare(password, user.password)
                if (!(user && hash)) {
                    res.send({ error_msg: 'Enter correct details...' })
                }
                else {
                    const token = jwt.sign({ userId: user._id }, process.env.secrete_key, { expiresIn: '25d' })
                    console.log(token)
                    user.token = token
                    user.password = '****'
                    user.jobapplied = null
                    res.send({ user: user, success: 'Login Successful', token })
                }
            }
        }
        catch (error) {
            console.log(error)
            res.send({ error_msg: "Something went wrong" })
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