import { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';
import { ConversationContext } from '../../contexts/ConversationContext';
import styles from './styles.module.scss';

interface AllChatsProps {
    message: AllChatsMessagesProps;
    chatName: string; 
}

interface AllChatsMessagesProps {
    Id: number;
    chatId: string;
    Author: string;
    messageBody: string;
    sendedAt: Date; 
}


export function SidebarChats() {
    const [allChats, setAllChats] = useState<AllChatsProps[]>([]);
    const { messages, setSelectedConversation } = useContext(ConversationContext);
    
    const user = useContext(UserContext);
    
    useEffect(() => {
        api.get(`/getAllChatsLastMessages/${user.Id}`).then(res => {
            setAllChats(res.data);
        })
    }, [user, messages]);

    return( 
        <ul className={styles.sidebarChats}>
            {allChats.map(chat => {
                return (
                    <li key={chat.message.Id} className={styles.sidebarChat}>
                        <a onClick={() => setSelectedConversation(chat.message.chatId) }>
                            <img src='' alt=""/>
                            <div>
                                <h4>{chat.chatName}</h4>
                                <p>{chat.message.messageBody}</p>
                            </div>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}