import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './chat.css';
import { server } from '../../config'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { chatWith } from '../../redux/chatSlice';



function ChatList(props) {

    const [friend, setFriend] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        const getFriend = async () => {
            await axios.get(`${server}/api/chat/friendlist/${localStorage.getItem('token')}`).then((response) => {
                console.log(response)
                setFriend(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }
        getFriend()

    }, [])


    function setChatWith(chatwith) {
        // set the friend to chat in redus store
        dispatch(chatWith(chatwith))
        // set component in profile to chat while clicking on the use
        props.setComponent('chat')
    }



    return (
        <div className="main">

            <div className="chatsection_company">
                <h2 style={{ color: "orangered", margin: 'auto', width: '500px' }}>YOUR FRIENDS.... </h2>

                {(friend.length > 0) ?

                    friend.map((item, id) => {
                        return <div className="chatperson" key={id} onClick={() => setChatWith(item.email)}>
                            <img src={'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png'} alt="" />
                            <section className="message_section_chat">
                                <span> {item.companyname || item.name}</span>
                                <span>click to chat...</span>
                            </section>
                        </div>
                    })


                    :
                    <h1>You Have No Friends to Chat</h1>
                }

            </div>
        </div>
    );
}

export default ChatList;