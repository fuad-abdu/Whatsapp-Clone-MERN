import React, { useEffect, useState } from 'react'
import './SidebarChats.css'

//Icons//

import { Avatar } from '@material-ui/core'

//Icons//

function SidebarChats({ addNewChat }) {

    const [seed, setSeed] = useState('');
    
    const createChat = () => {
        const roomName = prompt("Please Enter name for Chat")

        if(roomName){
            // do some db Stuff...
        }
    }

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    return !addNewChat ? (
        <div className="sidebarChats">
            <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
            <div className="sidebarChats__info">
                <h2>Room name</h2>
                <p>Last message</p>
            </div>
        </div>
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
