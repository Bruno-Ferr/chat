import { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';
import { ConversationContext } from '../../contexts/ConversationContext';
import styles from './styles.module.scss';

interface AllChatsProps {
    message?: AllChatsMessages;
    chatUser: chatUsers; 
}

interface chatUsers {
    chatname: string;
    chatId: string;
}

interface AllChatsMessages {
    id: number;
    chatId: string;
    author: string;
    messageBody: string;
    sendedat: Date; 
}

export function SidebarChats() {
    const [allChats, setAllChats] = useState<AllChatsProps[]>([]);
    const { messages, sawMessage } = useContext(ConversationContext);
    
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
                    <li key={chat.chatUser.chatId} className={styles.sidebarChat}>
                        <a onClick={() => sawMessage(chat.chatUser.chatId) }>
                            <img src='' alt=""/>
                            <div>
                                <h4>{chat.chatUser.chatname}</h4>
                                <p>{chat.message?.messageBody}</p>
                            </div>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}