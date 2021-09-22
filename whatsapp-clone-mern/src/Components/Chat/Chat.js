import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Chat.css";
import axios from "../../axios";

//Icon//

import { Avatar, IconButton } from "@material-ui/core";
import {
    AttachFile,
    InsertEmoticon,
    MoreVert,
    SearchOutlined,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import Pusher from "pusher-js";
import { AuthContext } from "../../Store/Context";

//Icon//

function Chat({messages, setMessages}) {

    const { user } = useContext(AuthContext);

    const [input, setInput] = useState('');
    const [RoomName, setRoomName] = useState('');
    const [seed, setSeed] = useState('');

    const { roomId } = useParams();

    useEffect(() => {
        if (roomId) {
            axios.get(`/rooms/sync`).then(res => {
                const rooms = res.data.filter((room) => {
                    return room._id === roomId
                });
                console.log('room name =====> ', rooms[0].name);
                setRoomName(rooms[0].name);
            })
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);


    useEffect(() => {
        if (roomId) {
            axios.get(`/messages/sync/${roomId}`).then(res => {
                console.log(res.data);
                setMessages(res.data);
            })
        }
    }, [roomId]);

    const sendMessage = async (e) => {

        e.preventDefault();

        var time = new Date();

        await axios.post('/messages/new', {
            roomId: roomId,
            message: input,
            name: user?.displayName,
            timestamp: time
            // received: true   
        });
        setInput('');
    }

    const lastSeen = messages.at(-1)?.timestamp
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{RoomName}</h3>
                    <p>
                        {`Last Seen  ${new Date(`${lastSeen}`).toLocaleString('en-US', { timeZone: zone })}`}
                        
                        {/* {
                            new Date(`${lastSeen}`).toLocaleString('en-US', { timeZone: zone })
                        } */}
                    </p>
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
                {messages.map((message) => {
                    const d = new Date(`${message.timestamp}`)
                    // const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    const date_time = d.toLocaleString('en-US', { timeZone: zone });
                    console.log("time ->  >>>> ", date_time);
                    return (
                        <p
                            className={`chat__message ${message.name === user?.displayName && "chat__reciever"
                                }`}
                        >
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">{date_time}</span>
                        </p>
                    )
                })}
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a Message"
                        type="text"
                    />
                    <button onClick={sendMessage} type="submit"> Send a Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default Chat;
