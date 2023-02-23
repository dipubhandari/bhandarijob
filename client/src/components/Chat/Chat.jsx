import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './chat.css';


function Chat(props) {

    return (
        <div className="main">

            <div className="chatsection">
                <div className="title">
                    <h2>YOU CAN CHAT NOW </h2>
                    <div className="messages">
                     
                           <div className="receiver">
                                <span>Messages</span>
                                <span> :username</span>
                                <img src="https://images-platform.99static.com//syUUBXWPuntRp-CG7bhwjByZIMg=/0x0:1080x1080/fit-in/500x500/99designs-contests-attachments/127/127807/attachment_127807231" alt="" />

                            </div>
                    </div>
                    <div className="sendfield">
                        <input type="text"

                            
                            placeholder='Type a message' />
                        <input type="submit" value='Send Message' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;