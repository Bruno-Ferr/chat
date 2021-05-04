import { SidebarHeader } from "../SidebarHeader";
import { Chats } from "../Chats";
import { ConversationContext } from "../../contexts/ConversationContext";

import styles from './styles.module.scss';
import { useContext } from "react";

export function Dashboard() {
  const { selectedConversation } = useContext(ConversationContext);

  return (
      <div className={styles.background}>
        <div className={styles.container}>
          <SidebarHeader />
          { selectedConversation && <Chats /> }
        </div> 
      </div>
  );
}