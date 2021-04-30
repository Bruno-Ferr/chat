import { AppProps } from 'next/app';
import { Provider as NextAuthProvider } from 'next-auth/client';

import '../styles/global.scss';
import styles from './home.module.scss';

import { SidebarHeader } from '../components/SidebarHeader';
import { UserProvider } from '../UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  


  return (
    <NextAuthProvider session={pageProps.session}>
      <UserProvider>
        <div className={styles.container}>
          <SidebarHeader />
          <Component {...pageProps} />
        </div> 
      </UserProvider>
    </NextAuthProvider>
    
  );
}

export default MyApp;