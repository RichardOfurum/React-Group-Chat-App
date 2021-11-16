import { Avatar, IconButton } from '@material-ui/core';
import React, {useEffect, useState } from 'react';
import "./styles/SidebarChat.css";
import './styles/EnterRoomName.css';
// import EnterRoomName from './EnterRoomName';
import CloseIcon from '@material-ui/icons/Close';
import db from '../firebase';
import { Link } from 'react-router-dom';


const SidbarChat = ({addNewChat, name, lastMessage, id}) => {
    const [seed, setSeed] = useState();
    const [showCreateRoom, setShowCreateRoom] = useState(false);
    const [roomName, setRoomName] = useState();
    const [messages, setMessages] = useState([]);

    const handleSubmit = (e) =>{
        e.preventDefault();
    
        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            });
        }
        
        setShowCreateRoom(false);
        setRoomName("");
    }

    const closeShowCreatRoom = (e) => {
        e.stopPropagation();
        setShowCreateRoom(false);
    }

    useEffect(() => {

        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map((doc) =>doc.data()))
                )
            )
        }

    }, [id]);

    const createChat = () =>{
        setShowCreateRoom(true);
    } 

    useEffect(() => {
       setSeed(Math.floor(Math.random() * 5000));
    }, []);

    return !addNewChat ?  (
        <Link to={`/rooms/${id}`}>
            <div className="sidebar-chat">
                <Avatar src={ `https://avatars.dicebear.com/api/human/${seed}.svg`}  />
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div 
            onClick={createChat}
            className="sidebar-chat"
        >
            <h2>Add New Chat</h2>
            { showCreateRoom && 
                <div className="enter-room-name">
                    <div className="input_container">
                        <IconButton className="icon-button" onClick={closeShowCreatRoom} >
                            <CloseIcon onClick={closeShowCreatRoom}/>
                        </IconButton>
                        <form onSubmit={handleSubmit}
                            className="create_new_chat_form"
                        >
                            <input className="add_chat_input" type="text" placeholder="Enter a name for a chat" 
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            />
                            <button className="add_chat_button" type="Submit"> Add chat room </button>
                        </form>
                    </div>
            </div>
            }
        </div>
        
    )
}

export default SidbarChat
