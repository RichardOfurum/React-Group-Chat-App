import React from 'react';
import './styles/EnterRoomName.css';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

const EnterRoomName = () => {

    const createNewChatRoom = (e) =>{
        e.preventDefault();
    }

    return (
        <div className="enter-room-name">
            <div className="input_container">
                <IconButton className="icon-button">
                    <CloseIcon/>
                </IconButton>
                <form className="create_new_chat_form" onSubmit={createNewChatRoom}>
                    <input type="text" placeholder="Enter a name for a chat" />
                    <button type="Submit"> Add chat room </button>
                </form>
            </div>
        </div>
    )
}

export default EnterRoomName
