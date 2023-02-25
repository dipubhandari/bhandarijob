import express from 'express'
import ChatController from '../Controller/Chat/Chat.js'

const chatRoutes = express.Router()

chatRoutes.post('/add-to-chat', ChatController.AddToChat)
chatRoutes.get('/friendlist/:token', ChatController.AllFriend)

export default chatRoutes