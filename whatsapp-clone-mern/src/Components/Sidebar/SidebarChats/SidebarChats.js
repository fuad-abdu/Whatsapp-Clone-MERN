import React from 'react'
import './SidebarChats.css'

//Icons//

import { Avatar } from '@material-ui/core'

//Icons//

function SidebarChats() {
    return (
        <div className="sidebarChats">
            <Avatar/>
            <div className="sidebarChats__info">
                <h2>Room name</h2>
                <p>LAST message</p>
            </div>
        </div>
    )
}

export default SidebarChats
