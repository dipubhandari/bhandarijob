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

    const senderEmail = 'tesla@gmail.com'
    // chat connection to server socket
    const socket = io.connect("http://localhost:5001")
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

    // sending the message to particular user
    const sendMessage = async () => {
        const messageDetails = {
            sender: localStorage.getItem('token'),
            receiver: currentchat,
            message: input,
            account: account
        }
        const sendMessage = await axios.post(`${server}/api/chat/send-message`, messageDetails).then((response) => {
            //socket implementation
            socket.emit('message', { sender: sender._id, receiver: receiver._id, message: input })
        })
    }

    // fetching the messages of particular users
    useEffect(() => {
        const getmessages = async () => {
            const sendMessage = await axios.get(`${server}/api/chat/messages/${localStorage.getItem('token')}/${currentchat}/${account}`).then((response) => {
                // adding user to socket when joined chat
                setMessages(response.data.messages)
                setSender(response.data.sender)
                setReceiver(response.data.receiver)

            })
        }
        getmessages()
    }, [])

    // adding user to socket on chat load
    useEffect(() => {

        // connect to socket to user 
        socket.emit('addUser', { senderId: localStorage.getItem('token') })

    }, [])
    // adding scrool effect when message are more then screen
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, [messages])

    return (
        <div className="main">

            <div className="chatsection">
                <div className="title">
                    <h2>YOU CAN CHAT NOW </h2>
                    <div className="messages">
                        {
                            messages.map((item, id) => {
                                return <div ref={scrollRef} className={`${(item.sender == sender.email) ? 'sender' : 'receiver'}`}>
                                    <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" alt="" />
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




// import "./messenger.css";
// import Topbar from "../../components/topbar/Topbar";
// import Conversation from "../../components/conversations/Conversation";
// import Message from "../../components/message/Message";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
// import { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { io } from "socket.io-client";

// export default function Messenger() {
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const socket = useRef();
//   const { user } = useContext(AuthContext);
//   const scrollRef = useRef();

//   useEffect(() => {
//     socket.current = io("ws://localhost:8900");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     socket.current.emit("addUser", user._id);
//     socket.current.on("getUsers", (users) => {
//       setOnlineUsers(
//         user.followings.filter((f) => users.some((u) => u.userId === f))
//       );
//     });
//   }, [user]);

//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const res = await axios.get("/conversations/" + user._id);
//         setConversations(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getConversations();
//   }, [user._id]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get("/messages/" + currentChat?._id);
//         setMessages(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMessages();
//   }, [currentChat]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const message = {
//       sender: user._id,
//       text: newMessage,
//       conversationId: currentChat._id,
//     };

//     const receiverId = currentChat.members.find(
//       (member) => member !== user._id
//     );

//     socket.current.emit("sendMessage", {
//       senderId: user._id,
//       receiverId,
//       text: newMessage,
//     });

//     try {
//       const res = await axios.post("/messages", message);
//       setMessages([...messages, res.data]);
//       setNewMessage("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       <Topbar />
//       <div className="messenger">
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//             <input placeholder="Search for friends" className="chatMenuInput" />
//             {conversations.map((c) => (
//               <div onClick={() => setCurrentChat(c)}>
//                 <Conversation conversation={c} currentUser={user} />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             {currentChat ? (
//               <>
//                 <div className="chatBoxTop">
//                   {messages.map((m) => (
//                     <div ref={scrollRef}>
//                       <Message message={m} own={m.sender === user._id} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chatBoxBottom">
//                   <textarea
//                     className="chatMessageInput"
//                     placeholder="write something..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                   ></textarea>
//                   <button className="chatSubmitButton" onClick={handleSubmit}>
//                     Send
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <span className="noConversationText">
//                 Open a conversation to start a chat.
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="chatOnline">
//           <div className="chatOnlineWrapper">
//             <ChatOnline
//               onlineUsers={onlineUsers}
//               currentId={user._id}
//               setCurrentChat={setCurrentChat}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }