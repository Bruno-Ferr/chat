import { MdKeyboardBackspace } from 'react-icons/md';
import { IoSearchOutline } from 'react-icons/io5';
 
import styles from './styles.module.scss';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../services/api';

interface CreateChatModalProps {
  onRequestClose: () => void;
}

interface friend {
  Id: number;
  Email: string;
  friendName: string;
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
  const [selectedFriend, setSelectedFriend] = useState([]);

  const [searchFriends, setSearchFriends] = useState<friend[]>([]);
  const [inputValue, setInputValue] = useState('');

  function handleChange(e) {
    setInputValue(e.target.value);
  }
 
  useEffect(() => {
    if(inputValue != ''){
      const search = allFriends.filter(friend => friend.Email.toUpperCase().includes(inputValue.toUpperCase()) || friend.friendName.toUpperCase().includes(inputValue.toUpperCase()));
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



  function handleCreateChat(friendEmail) {

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
            <input type="text" name="Search" placeholder="Digite o nome de um amigo" onChange={(event) => handleChange(event)} />
            <button type="button">
              <IoSearchOutline color="#919191" />
            </button>
          </div>
        </div>
        <ul className={styles.friendsList}>
          {searchFriends.map(friend => {    // get all friends and check one by one
            if(selectedFriend.find(selectedEmail => friend.Email === selectedEmail)) {   // If find any friend selected where friend.email = selected.email   
              return (                                                                   // Return this friend with the deselect button
                <li key={friend.Id} className={styles.sidebarChat}>
                  <div>
                    <h4>{friend.friendName}</h4>
                    <p>{friend.Email}</p>
                  </div>
                  <button type="button" onClick={() => handleDeselectFriend(friend.Email)}>
                    <BiXCircle color="#c74047" />
                  </button>
                </li>
              );

            } else {
              return (
                <li key={friend.Id} className={styles.sidebarChat}>
                  <div>
                    <h4>{friend.friendName}</h4>
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
        <button type="button" onClick={() => handleCreateChat(selectedFriend)} className={styles.createNewChat}>
          <p>Create new chat</p>
        </button>
        {/* Array de objetos(amigos), A busca é por email, selecionando e armazenando todos participantes do chat */}
      </div> 
  );
}
