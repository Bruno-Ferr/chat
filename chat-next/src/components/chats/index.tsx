import { BiCheckDouble } from 'react-icons/bi';
import { IoMdSend } from 'react-icons/io';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { ConversationContext } from '../../contexts/ConversationContext';

import styles from './styles.module.scss';


export function Chats() {
  const user = useContext(UserContext);
  const { messages, chatUsers, sendMessage } = useContext(ConversationContext);
  const [text, setText] = useState('');
  

  function handleSendMessage() {
    sendMessage(text) 
    setText('')
  }
  

  return (
    <main className={styles.chat}>
      <div className={styles.chatHeader}>
        <img src='' alt=""/>
        <h4>{chatUsers.chatName}</h4>
      </div>
      <div className={styles.chatBody}>
        <ul>

          {messages.map(message => {
            return message.author === user.Id ? 
            (
              <li key={message.Id}>
                <p className={styles.myMessage}>
                  {message.messageBody}
                  <time>12:32</time>
                  <BiCheckDouble color="#b6b6b6"/>
                </p>
              </li>
            ) : (
              <li key={message.Id}>
                <p>
                  {message.messageBody}
                  <time>12:32</time>
                </p>
              </li>
            )
          })}
        </ul>

      </div>
      <div className={styles.chatFooter}>
        <textarea name="message" required placeholder="Digite uma mensagem" value={text} onChange={((event) => setText(event.target.value))} />
        <button type="button" onClick={() => handleSendMessage()}>
          <IoMdSend color="#919191" />
        </button>
      </div>
    </main>
  );
}