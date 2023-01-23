import express from 'express'
import UserController from '../Controller/User/UserController.js'


const userRoutes = express.Router()

userRoutes.post('/newuser', UserController.UserAccountCreation)
userRoutes.post('/login', UserController.User__Login)
userRoutes.post('/checklogin', UserController.Check__Login)




export default userRoutes