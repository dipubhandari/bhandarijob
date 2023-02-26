import { useSelector } from 'react-redux'
import React, { useEffect,useRef, useState } from 'react';
import { server } from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './chat.css';
import { chatWith } from '../../redux/chatSlice'
import { account } from '../../redux/accountSlice'
import ReactTimeAgo from 'react-time-ago'

function Chat(props) {
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

    // sending the message to particular user
    const sendMessage = async () => {
        const messageDetails = {
            sender: localStorage.getItem('token'),
            receiver: currentchat,
            message: input,
            account: account
        }
        const sendMessage = await axios.post(`${server}/api/chat/send-message`, messageDetails).then((response) => {
            console.log(response)
        })
    }
    // fetching the messages of particular users
    useEffect(() => {
        const getmessages = async () => {
            const sendMessage = await axios.get(`${server}/api/chat/messages/${localStorage.getItem('token')}/${currentchat}/${account}`).then((response) => {
                setMessages(response.data.messages)
                setSender(response.data.sender)
                setReceiver(response.data.receiver)
            })
        }
        getmessages()
    }, [])


// adding scrool effect when message are more then screen
    useEffect(()=>{
   scrollRef.current?.scrollIntoView({behaviour:"smooth"})
    },[messages])

    return (
        <div className="main">

            <div className="chatsection">
                <div className="title">
                    <h2>YOU CAN CHAT NOW </h2>
                    <div className="messages">
                        {
                            messages.map((item, id) => {
                                return <div ref={scrollRef} className={`${(item.sender == sender.email) ? 'sender' : 'receiver'}`}>
                                    <span className="msgtahu">  <span>{item.message}<span className="messageTime"> <ReactTimeAgo date={item.createdAt} locale="en-US" /></span></span>
                                        <span>{(item.sender == sender.email) ? 'You' : receiver.name || receiver.companyname}</span></span>
                                    <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" alt="" />
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