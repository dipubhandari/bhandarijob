import { useSelector } from 'react-redux'
import React, { useEffect, useRef, useState } from 'react';
import { server } from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './chat.css';
import { chatWith } from '../../redux/chatSlice'
import { account } from '../../redux/accountSlice'
import ReactTimeAgo from 'react-time-ago'
import { io } from 'socket.io-client'

function Chat(props) {

    const socket = useRef()
    const senderEmail = 'tesla@gmail.com'
    // chat connection to server socket
    // ref for auto scroll
    const scrollRef = useRef()
    // account type of the user
    const account = useSelector(state => state.Account)
    // fetch current user to chat 
    const currentchat = useSelector(state => state.chat)
    // message inputs
    const [input, setInput] = useState('')
    // messges with current chat 
    const [messages, setMessages] = useState([])
    // sender info
    const [sender, setSender] = useState({})
    // receiver info
    const [receiver, setReceiver] = useState({})
    // new message for sending from another user via socket
    const [newmessage, setnewmessage] = useState(null)


    useEffect(() => {
        socket.current = io.connect("http://localhost:5001")
    }, [])
    // sending the message to particular user
    const sendMessage = async () => {
        const messageDetails = {
            sender: localStorage.getItem('token'),
            receiver: currentchat,
            message: input,
            account: account
        }
        const sendMessage = await axios.post(`${server}/api/chat/send-message`, messageDetails).then((response) => {
            // appending my current message to messages so that it act as real time
            setMessages([...messages, { sender: sender.email, receiver: receiver.email, message: input, seen: false, createdAt: Date.now() }])
            //socket implementation
            socket.current.emit('message', { sender: sender._id, receiver: receiver._id, message: input })
        })
    }


    useEffect(() => {
        socket.current.on('getMessage', (payload) => {
            setMessages([...messages, { createdAt: Date.now(), sender: receiver.email, receiver: sender.email, message: payload.message }])
        })

    }, [])
    // fetching the messages of particular users
    useEffect(() => {
        const getmessages = async () => {
            const sendMessage = await axios.get(`${server}/api/chat/messages/${localStorage.getItem('token')}/${currentchat}/${account}`).then((response) => {
                // adding user to socket when joined chat
                setMessages(response.data.messages)
                setSender(response.data.sender)
                console.log(response.data.receiver)
                setReceiver(response.data.receiver)

            })
        }
        getmessages()
        // adding user to socket on chat
        socket.current.emit('addUser', { senderId: localStorage.getItem('token') })
    }, [])

    // adding scroll effect when message are more then screen
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, [messages])

    return (
        <div className="chatContainer">

            <div className="chatsection">
                <div className="title">
                    <h2>CHATTING NOW WITH {receiver.name || receiver.companyname} </h2>
                    <div className="messages">
                        {
                            messages.map((item, id) => {
                                return <div ref={scrollRef} className={`${(item.sender == sender.email) ? 'sender' : 'receiver'}`}>
                                    <img src={(account == 'employer') ? (item.sender == sender.email) ? `${server}/uploads/logo/${sender.logo}` : "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png" : (item.sender == sender.email) ? "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png" : `${server}/uploads/logo/${receiver.logo}`} alt="" />
                                    <span className="msgtahu">  <span>{item.message}<span className="messageTime"> <ReactTimeAgo date={item.createdAt} locale="en-US" /></span></span>
                                        <span className='sendername'>{(item.sender == sender.email) ? 'You' : receiver.name || receiver.companyname}</span></span>

                                </div>
                            })
                        }

                    </div>
                    <div className="sendfield">
                        <input type="text" placeholder='Type a message' onChange={(e) => setInput(e.target.value)} />
                        <input type="submit" value='Send Message' onClick={sendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;


