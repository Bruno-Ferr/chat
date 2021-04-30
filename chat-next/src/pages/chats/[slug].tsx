import { BiCheckDouble } from 'react-icons/bi'
import io from 'socket.io-client';
import { ChatFooter } from '../../components/ChatFooter';

import styles from './styles.module.scss';



export default function ChatBody() {
  // const socket = io('http://localhost:3333');

  return (
    <main className={styles.chat}>
      <div className={styles.chatHeader}>
        <img src='' alt=""/>
        <h4>Nome</h4>
      </div>
      <div className={styles.chatBody}>
        <p>
          Mensagem
          <time>12:32</time>
        </p>

        <p>
          Mensagem
          <time>12:32</time>
        </p>

        <p className={styles.myMessage}>
          Essa é minha mensagem
          <time>12:32</time>
          <BiCheckDouble color="#b6b6b6"/>
        </p>

      </div>
      <ChatFooter />
    </main>
  
  );
}