import { Sidebar } from "../Sidebar";
import { Chats } from "../Chats";
import { ConversationContext } from "../../contexts/ConversationContext";

import styles from './styles.module.scss';
import { useContext } from "react";

export function HomePage() {
  const { selectedConversation } = useContext(ConversationContext);

  return (
      <div className={styles.background}>
        <div className={styles.container}>
          <Sidebar />
          { selectedConversation && <Chats /> }
        </div> 
      </div>
  );
}