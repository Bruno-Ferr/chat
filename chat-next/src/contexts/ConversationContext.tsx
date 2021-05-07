import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import io from 'socket.io-client';
import { UserContext } from "./UserContext";
import { format } from 'date-fns';
import ptBR from "date-fns/locale/pt-BR";

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
  seen: boolean;
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
      setMessages([...messages])
      if(params.chatId === selectedConversation) {
        setMessages([...messages, { 
          author: params.author, 
          chatId: params.chatId, 
          messageBody: params.text, 
          sendedAt: format(new Date(), 'HH mm', { locale: ptBR }),
          seen: false
          }
        ]);
      }
    });
  }, [messages]);

  // useEffect(() => {
  //   if(messages[0] != undefined){
  //       if(messages[messages.length - 1].author !== user.Id) {
  //         if(messages[messages.length - 1].seen === false) {
  //           socket.emit("saw-message", ({ chatId: chatUsers.chatId, userId: messages[messages.length - 1].author }))
  //         }
  //       }
  //   }
  // }, [messages, selectedConversation])


  function sendMessage(text) {
    socket.emit("send-message", ({chatUsers: chatUsers.chatId, text, userId: user.Id}));
    setMessages([...messages, { 
      author: user.Id, 
      chatId: chatUsers.chatId, 
      messageBody: text, 
      sendedAt: format(new Date(), "HH mm", { locale: ptBR }),
      seen: false
      }
    ]);
  }
  


  useEffect(() => {
    if(selectedConversation) {
      api.get(`/getMessages/${selectedConversation}`).then(res => {
        const formattedMessages = res.data.map(message => {
          return {
            ...message,
            sendedAt: format(new Date(message.sendedAt), "HH mm", {
            locale: ptBR
            }),
            seen: message.seen === 0 ? false : true
          }
        });

        setMessages(formattedMessages);
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

