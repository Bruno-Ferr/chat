import { MdKeyboardBackspace } from 'react-icons/md';
import { IoSearchOutline } from 'react-icons/io5';
 
import styles from './styles.module.scss';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { BiCheckCircle } from 'react-icons/bi';
import { UserContext } from '../../contexts/UserContext';

interface AddFriendModalProps {
  onRequestClose: () => void;
}



export function AddFriendModal({ onRequestClose }: AddFriendModalProps) {
  const user = useContext(UserContext);
  const [inputValue, setInputValue] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function searchUser() {
    api.get(`users/${inputValue}`).then(res => {
      setAllUsers(res.data)
    });
  }

  function handleAddFriend(newFriendEmail) {
    const body = {
      email: newFriendEmail,
      userId: user.Id,
      name: 'new'
    }

    api.post('friends', body ).then(res => {
      onRequestClose();
    });
  } 

  return (
      <div className={styles.addFriends}>
        <div className={styles.addFriendsInput}>
          <div>
            <button onClick={onRequestClose}>
              <MdKeyboardBackspace color="rgb(100, 100, 100)" />
            </button>
            <h3>Adicionar amigo</h3>
          </div> 
          <div className={styles.addFriendsSend}>
            <input type="text" name="Search" placeholder="Digite o email do usuário" onChange={(event) => handleChange(event)}/>
            <button type="button" onClick={() => searchUser()}>
              <IoSearchOutline color="#919191" />
            </button>
          </div>
        </div>
        <ul className={styles.usersList}>
          {allUsers.map(user => { 
              return (  
                <li key={user.Id} className={styles.sidebarChat}>
                  <div>
                    <h4>{user.Email}</h4>
                    <p></p>
                  </div>
                  <button type="button" onClick={() => handleAddFriend(user.Email)}>
                    <BiCheckCircle color="#58b33c" />
                  </button>
                </li>
              );
          })}   
        </ul>
        {/* A busca vai retornar um array de objetos, se retornar um array vazio não existem usuários com esse email */}
      </div>
      
  );

}
