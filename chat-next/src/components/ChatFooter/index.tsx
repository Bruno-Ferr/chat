import { IoMdSend } from 'react-icons/io'

import styles from './styles.module.scss';

export function ChatFooter() {
    return (
            <div className={styles.chatFooter}>
                <textarea name="message" placeholder="Digite uma mensagem"/>
                <button type="submit">
                    <IoMdSend color="#919191" />
                </button>
            </div>
    );
}