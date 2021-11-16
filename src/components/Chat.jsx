import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import MoreVert from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import React, {useEffect, useState} from 'react'
import "./styles/Chat.css";
import { useParams } from 'react-router';
import db from '../firebase';
import { useHistory} from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import firebase from "firebase";


const Chat = () => {
    const [seed, setSeed] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const history = useHistory();
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    const sendMessage = (e) =>{
        e.preventDefault();

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: messageInput,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setMessageInput("");
    }

   

    useEffect(() =>{
            if(roomId){
              
                const getRoomWithId = db.collection('rooms').doc(roomId);

                getRoomWithId.get().then((doc) =>{
                    if(doc.exists){
                        // console.log("Document data:", doc.data());
                        setRoomName(doc.data().name);
                    }else{
                        history.goBack();
                        // console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error gettting document:", error);
                });



                db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot =>(
                    setMessages(snapshot.docs.map((doc) =>
                        doc.data()
                    ))
                ));
                   
                console.log(messages);
        }
        
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
     }, [roomId]);


     

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={ `https://avatars.dicebear.com/api/human/${seed}.svg`}  />

                <div className="chat_header_info">
                    <h3>{roomName}</h3>
                    <p>
                        {
                            new Date(
                                messages.[messages.length - 1]?.timestamp?.toDate()
                            ).toUTCString()
                        }
                    </p>
                </div>

                <div className="chat_headerRight">
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

            <div className="chat_body">

                {
                    messages.map(message => (
                        <p
                        key={message.id} 
                        className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
                            <span className="chat_name"> {message.name} </span>
                            {message.message}
                            <span className="chat_timestamp"> {new Date(message.timestamp?.toDate()).toUTCString()} </span>
                        </p>
                    ))
                }

                {/* <p className={`chat_message ${true && "chat_receiver"}`}>
                    <span className="chat_name"> Richard </span>
                    Hey guys
                    <span className="chat_timestamp">3:52pm</span>
                </p>
                <p className={`chat_message ${false && "chat_receiver"}`}>
                    <span className="chat_name"> Ifeanyi </span>
                    Hey guys
                    <span className="chat_timestamp">3:52pm</span>
                </p> */}
            </div>

            

            <div className="chat_footer">
                <InsertEmoticon/>
                <form onSubmit={sendMessage}>
                    <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Type a message"/>
                    <button type="submit" >Send a message </button>
                </form>
                <MicIcon/>
            </div>

        </div>
    )
}

export default Chat
