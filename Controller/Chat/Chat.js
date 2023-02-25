import Chat_Model from '../../model/chats.js'
import Friend_Model from '../../model/friend.js'
import Employer_Model from '../../model/employer.js';


class ChatController {

    static NewMessage = async (req, res) => {
        try {
            // const newMessage = await Chat_Model.create(req.body)
            // res.send(newMessage)
        } catch (error) {

        }
    }
    // get all friends list
    static AllFriend = async (req, res) => {
        try {
            const friends = await Friend_Model.findOne({ user: req.params.token })

            const friendDetail = await Employer_Model.find({
                email: { $in: friends.friend }
            })
            res.send(friendDetail)

        } catch (error) {
            res.send({ error_msg: "Something went Wrong" })
        }
    }

    // adding the user to the friend list
    static AddToChat = async (req, res) => {
        try {
            //   get id of the user
            const { token, chatWith } = req.body
            // check if the user is exist in the friend model
            const user = await Friend_Model.findOne({ user: token })
            // friend list is not created of adding user then created and add to chat
            if (!user) {
                const addList = await Friend_Model.create({ user: token, friend: [chatWith] })
                res.send({ message: "Successfully Add to chat" })
            }
            //if list is already created then check and add to chat
            else {
                const checkIfExist = await Friend_Model.findOne({
                    user: token,
                    friend: { $in: chatWith }
                })
                if (!checkIfExist) {
                    const addList = await Friend_Model.updateOne({ user: token }, { friend: [...user.friend, chatWith] })
                    res.send({ message: "Successfully Add to chat" })
                }
                else {
                    res.send({ message: "Adready Exist" })
                }

            }

        } catch (error) {
            console.log('error', error)
            res.send({ message: "Something went wrong" })
        }
    }

}

export default ChatController