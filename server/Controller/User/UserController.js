import bcrypt from 'bcryptjs';
import User_Model from "../../model/User.js"
import jwt from 'jsonwebtoken';

class UserController {

    static UserAccountCreation = async (req, res) => {
        console.log('This works')
        // get data from user

        const { name, email, phone, password } = req.body

        // (if)
        // check data in the db if exitst or not
        const user = await User_Model.findOne({ email, password })
        if (user) {
            res.send({ error_msg: 'Email used. Try New Email.' })
        }
        else {
            // const pasword = req.body.password

            const user_detail = await User_Model.create({
                name,
                email,
                password: password
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

        // check data in the db if exitst or not
        const user = await User_Model.findOne({ email })
        if (!user) {
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
        const user = await User_Model.findOne({ email, password })
        if (user) {
            res.send(true)
        }
        else {
            res.send(false)
        }
        console.log(user)
    }
}

export default UserController