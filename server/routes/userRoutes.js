import express from 'express'
import UserController from '../Controller/User/UserController.js'


const userRoutes = express.Router()

userRoutes.post('/new', UserController.UserAccountCreation)
userRoutes.post('/login', UserController.User__Login)




export default userRoutes