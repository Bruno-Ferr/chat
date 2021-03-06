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
    if(text !== '') {
      sendMessage(text) 
      setText('')
    }
  }

  return (
    <main className={styles.chat}>
      <div className={styles.chatHeader}>
        <img src='' alt=""/>
        <h4>{chatUsers.chatname}</h4>
      </div>
      <div className={styles.chatBody}>
        <ul>

          {messages.map((message,  index) => {
            return message.author === user.Id ? (
              message.seen === false ? (
                <li key={index}>
                  <div className={styles.myMessage}>
                    <p>
                      {message.messageBody}
                    </p>
                    <time>{message.sendedat}</time>
                    <BiCheckDouble color="#f0f0f0"/>
                  </div>
                </li>
              ): (
                <li key={index}>
                  <div className={styles.myMessage}>
                    <p>
                      {message.messageBody}
                    </p>
                    <time>{message.sendedat}</time>
                    <BiCheckDouble color="#0b8500"/>
                  </div>
                </li>
              ) 
              ) : (
              <li key={index}>
                <div>
                  <p>
                    {message.messageBody}
                  </p>
                  <time>{message.sendedat}</time>
                </div>
              </li>
            )
          })}
        </ul>

      </div>
      <div className={styles.chatFooter}>
        <textarea name="message" required placeholder="Digite uma mensagem" value={text} onChange={((event) => setText(event.target.value))} />
        <button type="submit" onClick={(() => handleSendMessage())}>
          <IoMdSend color="#919191" />
        </button>
      </div>
    </main>
  );
}