import express from 'express'
import ChatController from '../Controller/Chat/Chat.js'

const chatRoutes = express.Router()

chatRoutes.post('/add-to-chat', ChatController.AddToChat)
chatRoutes.get('/friendlist/:token', ChatController.AllFriend)

// send message
chatRoutes.post('/send-message', ChatController.SendMessage)

// fetch user message in chat section
chatRoutes.get('/messages/:sender/:receiver/:account', ChatController.Messages)

export default chatRoutes