import { FcGoogle } from 'react-icons/fc';
import { RiChat4Line } from 'react-icons/ri';

import { signIn } from 'next-auth/client';

import styles from './login.module.scss';

export default function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>

            </div>
            <div className={styles.infos}>
                <h2><RiChat4Line />Chat</h2>
                <h4>Bem vindo</h4>
                <button className={styles.googleDescription} onClick={() => signIn('google', {callbackUrl: 'http://localhost:3000'})}>
                    <FcGoogle/>
                    <p>Login com google</p>
                </button>
            </div>
        </div>
    );
}