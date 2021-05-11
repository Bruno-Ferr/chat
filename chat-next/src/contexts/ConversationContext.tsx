import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { UserContext } from "./UserContext";
import { format } from 'date-fns';
import ptBR from "date-fns/locale/pt-BR";
import { io } from "socket.io-client";

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
  sawMessage: (chatId: string) => void;
  messages: messages[];
  chatUsers: chatUsers;
  sendMessage: (text) => void;
}

export const ConversationContext = createContext<ConversationContextProps>({} as ConversationContextProps);

export function ConversationProvider({ children }: ConversationProviderProps) {
  const [selectedConversation, setSelectedConversation] = useState('');
  const [messages, setMessages] = useState([]);
  const user = useContext(UserContext);
  const [chatUsers, setChatUsers] = useState<chatUsers>({} as chatUsers);

  const socket = io('http://localhost:3333', { query: { id: user.Id } })

  useEffect(() => {
    if(selectedConversation) {
      api.get('/chatUsers', {params: {id: user.Id, chatId: selectedConversation}}).then(res => {
        setChatUsers(res.data[0]);
      });

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

    }
  }, [selectedConversation]);
  


  useEffect(() => {
    socket.on('receive-message', params => {
      if(params.chatId === selectedConversation) {
        setMessages([...messages, { 
          author: params.author, 
          chatId: params.chatId, 
          messageBody: params.text, 
          sendedAt: format(new Date(), 'HH mm', { locale: ptBR }),
          seen: true
        }]);
        sawMessage(params.chatId)
      } else {
        setMessages([...messages])
      }
      socket.close();
    });

  }, [messages]);

  async function sawMessage(chatId) {
    await setSelectedConversation(chatId);

    if(messages[0] !== undefined){
      if(messages[messages.length - 1].author !== user.Id) {
        socket.emit("saw-message", ({ chatId, userId: messages[messages.length - 1].author }));
      }
    }
    
  }

  useEffect(() => {
    socket.on('seen-message', () => {
      const isSeen = messages.map(message => {
        return {
          ...message,
          seen: true
        }
      })
      setMessages(isSeen)
      socket.close();
    });

  }, [messages]);

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


  return (
    <ConversationContext.Provider value={{ chatUsers, messages, selectedConversation, sawMessage, sendMessage }}>
      {children}
    </ConversationContext.Provider>
  );
}