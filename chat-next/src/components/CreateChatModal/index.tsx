import { MdKeyboardBackspace } from 'react-icons/md';
import { IoSearchOutline } from 'react-icons/io5';
 
import styles from './styles.module.scss';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../services/api';
import { ConversationContext } from '../../contexts/ConversationContext';

interface CreateChatModalProps {
  onRequestClose: () => void;
}

interface friend {
  id: number;
  Email: string;
  friendname: string;
  userId: string;
}

export function CreateChatModal({ onRequestClose }: CreateChatModalProps) {
  const user = useContext(UserContext);

  useEffect(() => {
    api.get(`friends/${user.Id}`).then(res => {
      const friends = res.data;
      setAllFriends(friends);
      setSearchFriends(friends);
    })
  }, []);

  const [allFriends, setAllFriends] = useState<friend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState([user.Email]);

  const [searchFriends, setSearchFriends] = useState<friend[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [chatName, setChatName] = useState('');
 
  useEffect(() => {
    if(inputValue != ''){
      const search = allFriends.filter(friend => friend.Email.toUpperCase().includes(inputValue.toUpperCase()) || friend.friendname.toUpperCase().includes(inputValue.toUpperCase()));
      setSearchFriends(search);
    } else {
      setSearchFriends(allFriends);
    }
  }, [inputValue])

  function handleSelectFriend(Email) {
    setSelectedFriend([...selectedFriend, Email]);
  }

  function handleDeselectFriend(Email) {
    const removeSelected = selectedFriend.filter(selected => selected !== Email);
    setSelectedFriend(removeSelected);
  }


  function handleCreateChat() {
    api.post('/chats', {data: {selectedFriend, chatName} })

    onRequestClose()
  }

  return (
      <div className={styles.createChat}>
        <div className={styles.createChatInput}>
          <div>
            <button onClick={onRequestClose}>
              <MdKeyboardBackspace color="rgb(100, 100, 100)" />
            </button>
            <h3>Criar novo chat</h3>
          </div> 
          <div className={styles.createChatSend}>
            <input type="text" name="Search" placeholder="Digite o nome de um amigo" onChange={(event) => setInputValue(event.target.value)} />
            <button type="button">
              <IoSearchOutline color="#919191" />
            </button>
          </div>
        </div>
        <ul className={styles.friendsList}>
          {searchFriends.map(friend => {    // get all friends and check one by one
            if(selectedFriend.find(selectedEmail => friend.Email === selectedEmail)) {   // If find any friend selected where friend.email = selected.email   
              return (                                                                   // Return this friend with the deselect button
                <li key={friend.id} className={styles.sidebarChat}>
                  <div>
                    <h4>{friend.friendname}</h4>
                    <p>{friend.Email}</p>
                  </div>
                  <button type="button" onClick={() => handleDeselectFriend(friend.Email)}>
                    <BiXCircle color="#c74047" />
                  </button>
                </li>
              );

            } else {
              return (
                <li key={friend.id} className={styles.sidebarChat}>
                  <div>
                    <h4>{friend.friendname}</h4>
                    <p>{friend.Email}</p>
                  </div>
                  <button type="button" onClick={() => handleSelectFriend(friend.Email)}>
                    <BiCheckCircle color="#58b33c" />
                  </button>
                </li>
              );
            }
          })}   
        </ul>
        <div className={styles.chatName}>
          <input type="text" name="chatName" placeholder="Nome do chat" onChange={((event) => setChatName(event.target.value))} />
        </div>
        <button type="button" onClick={() => handleCreateChat()} className={styles.createNewChat} disabled={selectedFriend.length <= 1}>
          <p>Create new chat</p>
        </button>
        {/* Array de objetos(amigos), A busca é por email, selecionando e armazenando todos participantes do chat */}
      </div> 
  );
}
