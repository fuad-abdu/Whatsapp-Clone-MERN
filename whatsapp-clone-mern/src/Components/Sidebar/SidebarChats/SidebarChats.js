import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './SidebarChats.css'

//Icons//

import { Avatar } from '@material-ui/core'
import axios from '../../../axios';

//Icons//

function SidebarChats({ addNewChat, name, id, chats }) {

    const [seed, setSeed] = useState('');

    const createChat = () => {
        const roomName = prompt("Please Enter name for Chat")

        if (roomName) {
            // do some db Stuff...
            axios.post('/rooms/new', {
                name: roomName
            });
        }
    }

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChats">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                <div className="sidebarChats__info">
                    <h2>{name}</h2>
                    <p>Last message</p>
                </div>
            </div>
        </Link>
    ) : (
        <div
            className="sidebarChats"
            onClick={createChat}
        >
            <h3>Add new Chat</h3>
        </div>
    )
}

export default SidebarChats
