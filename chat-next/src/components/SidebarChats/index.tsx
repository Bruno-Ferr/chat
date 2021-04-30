import { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { socket } from '../../services/socket';
import { UserContext } from '../../UserContext';
import styles from './styles.module.scss';

export function SidebarChats() {
    const [allChats, setAllChats] = useState([]);
    const user = useContext(UserContext);
    
    useEffect(() => {
        socket.on("connect", () => {
            socket.emit("user_sidebar", {userId: user.Id} );
    
            socket.on("all_chats", chats  => {
                const { allChats } = chats;
    
                setAllChats(allChats);
                console.log(allChats)
            });
        });
    }, [])

    return( 
        <ul className={styles.sidebarChats}>
            {allChats.map(chat => {
                <li key={chat.message.Id} className={styles.sidebarChat}>
                    <a href="../chats/A">
                        <img src='' alt=""/>
                        <div>
                            <h4>{chat.message.Name}</h4>
                            <p>{chat.message.messageBody}</p>
                        </div>
                    </a>
                </li>
            })}
        </ul>
    );
}