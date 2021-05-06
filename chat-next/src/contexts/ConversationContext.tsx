import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import io from 'socket.io-client';
import { UserContext } from "./UserContext";

interface ConversationProviderProps {
  children: ReactNode
}

interface chatUsers {
  chatName: string;
  chatId: string;
}

interface messages {
  Id: number;
  chatId: string;
  author: string;
  messageBody: string;
  sendedAt: string;
}

interface ConversationContextProps {
  selectedConversation: string; 
  setSelectedConversation: (chatId: string) => void;
  messages: messages[];
  chatUsers: chatUsers;
  sendMessage: (text) => void;
}

export const ConversationContext = createContext<ConversationContextProps>({} as ConversationContextProps);

export function ConversationProvider({ children }: ConversationProviderProps) {
  const [selectedConversation, setSelectedConversation] = useState('');
  const [messages, setMessages] = useState([]);
  const user = useContext(UserContext);
  const [chatUsers, setChatUsers] = useState({} as chatUsers);

  const socket = io('http://localhost:3333', { query: { id: user.Id } });

  useEffect(() => {
    socket.on('receive-message', params => {
      setMessages([...messages, { author: params.author, chatId: params.chatId, messageBody: params.text, sendedAt: new Date() }])
    });
  }, [messages])

  function sendMessage(text) {
    socket.emit("send-message", ({chatUsers: chatUsers.chatId, text, userId: user.Id}));
    setMessages([...messages, { author: user.Id, chatId: chatUsers.chatId, messageBody: text, sendedAt: new Date() }]);
  }

  useEffect(() => {
    if(selectedConversation) {
      api.get(`/getMessages/${selectedConversation}`).then(res => {
        setMessages(res.data);
      });
      api.get('/chatUsers', {params: {id: user.Id, chatId: selectedConversation}}).then(res => {
        setChatUsers(res.data[0]);
      })
    }
  }, [selectedConversation]);

  return (
    <ConversationContext.Provider value={{ chatUsers, messages, selectedConversation, setSelectedConversation, sendMessage }}>
      { children }
    </ConversationContext.Provider>
  );
}

