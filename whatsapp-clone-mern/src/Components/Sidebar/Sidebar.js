import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";

import SidebarChats from "./SidebarChats/SidebarChats";
import Pusher from 'pusher-js';

//Icons//

import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import axios from "../../axios";
import { AuthContext } from "../../Store/Context";

//Icons//

function Sidebar() {

  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("/rooms/sync").then((res) => {
      console.log(res.data);
      setRooms(res.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("12852351f22566cbb74b", {
      cluster: "eu",
    });
    const RoomChannel = pusher.subscribe("room");
    RoomChannel.bind("RoomInserted", (data) => {
      setRooms([...rooms, data]);
    });

    return () => {
      RoomChannel.unbind_all();
      RoomChannel.unsubscribe();
    };
  }, [rooms]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={`${user?.photoURL}`} />

        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or Start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChats addNewChat />
        {rooms.map((room) => {
          return <SidebarChats key={room._id} id={room._id} name={room.name} />;
        })}
      </div>
    </div>
  );
}

export default Sidebar;
