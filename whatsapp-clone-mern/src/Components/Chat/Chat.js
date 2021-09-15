import React from 'react'
import './Chat.css'

//Icon//

import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic';

//Icon//

function Chat() {
    return (
        <div className="chat">

            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>Last Seen at..</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">

                <p className="chat__message">
                    <span className="chat__name">Fuad</span>

                    This is a Message

                    <span className="chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>

                <p className="chat__message chat__reciever">
                    <span className="chat__name">Fuad</span>

                    This is a Message

                    <span className="chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>

                <p className="chat__message">
                    <span className="chat__name">Fuad</span>

                    This is a Message

                    <span className="chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>
                
            </div>

            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <input placeholder="Type a Message" type="text" />
                    <button  type="submit"> Send a Message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
