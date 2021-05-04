import { signOut } from 'next-auth/client';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';


import { GrLogout } from 'react-icons/gr';
import { IoPersonAddSharp } from 'react-icons/io5';
import { RiChatNewLine } from 'react-icons/ri';
import { SidebarChats } from '../SidebarChats';

import styles from './styles.module.scss';
import { AddFriendModal } from '../AddFriendModal';
import { CreateChatModal } from '../CreateChatModal';

export function SidebarHeader() {
    const user = useContext(UserContext);
    const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
    const [isCreateChatModalOpen, setIsCreateChatModalOpen] = useState(false);

    function handleOpenCreateChatModal() {
        setIsCreateChatModalOpen(true);
      }
    
      function handleCloseCreateChatModal() {
        setIsCreateChatModalOpen(false);
      }

    function handleOpenAddFriendModal() {
        setIsAddFriendModalOpen(true);
    }

    function handleCloseAddFriendModal() {
        setIsAddFriendModalOpen(false);
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <img src={user.Image} alt="Foto de perfil"/>
                <h3>{user.Name}</h3>
                <button onClick={() => signOut()}>
                    <GrLogout />
                </button>
            </div> 

            {isAddFriendModalOpen ?   
                (   
                    <AddFriendModal onRequestClose={handleCloseAddFriendModal} />
                ) : isCreateChatModalOpen ? (
                    <CreateChatModal onRequestClose={handleCloseCreateChatModal} />
                ) : (
                    <>
                        <div className={styles.moreChats}>
                            <button type="button" onClick={handleOpenAddFriendModal}>
                                <IoPersonAddSharp color="#b6b6b6"/>
                            </button>
                            <button type="button" onClick={handleOpenCreateChatModal}>
                                <RiChatNewLine color="#b6b6b6"/>  
                            </button> 
                        </div>
                        <SidebarChats />
                    </>
                )
            }    
        </aside>
    );
}