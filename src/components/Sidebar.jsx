import React, {useState, useEffect} from 'react';
import './styles/Sidebar.css';
import { Avatar , IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import SidbarChat from './SidbarChat';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import { useHistory} from 'react-router-dom';

const Sidebar = () => {

    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => setRooms(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        ));

        return () => {
            unsubscribe();
        }

    }, []);

    useEffect(() => {
        if(!user){
            history.push("/");
        }
    }, [user]);

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton >
                    <IconButton>
                        <ChatIcon/>
                    </IconButton >
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton >
                        
                        
                    
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_search_container">
                    <SearchOutlined/>
                    <input type="text" placeholder="Search of start new Chat" />
                </div> 
            </div>

            <div className="sidebar_chats">

                <SidbarChat addNewChat="Add New Room"/>
                
                {
                    rooms.map(room => (
                        <SidbarChat 
                            key={room.id} 
                            name={room.data.name}
                            lastMessage="Last Message..."
                            id={room.id}
                        />
                    ))
                }

               
            </div>
        </div>
    )
}

export default Sidebar
