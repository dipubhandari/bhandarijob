import jwt from 'jsonwebtoken'
import userModel from '../model/registrationForm.js'
const auth = async (req, res, next) => {
    let token
    // getting authorizaion from request header
    const { authorization } = req.headers
    try {
        // is authorizatin exist and starts with Bearer
        if (authorization) {
            token = authorization.split(' ')[1]
            // verifying the token
        }
        const { UserId } = jwt.verify(token, process.env.secrete_key)
        // get user from and append to req object
        console.log(UserId)
        const user = await userModel.findOne({ _id: UserId })
        user.password = null
        console.log(user)
        req.user = user
        next()
    }
    catch (error) {
        res.status(401).send({ error_msg: 'Unauthorized user', status: 'Failed' })
    }
}
export default auth