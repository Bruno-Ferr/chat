import { AppProps } from 'next/app';
import { Provider as NextAuthProvider } from 'next-auth/client';

import '../styles/global.scss';

import { UserProvider } from '../contexts/UserContext';
import { ConversationProvider } from '../contexts/ConversationContext';

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <NextAuthProvider session={pageProps.session}>
      <UserProvider>
          <ConversationProvider>
            <Component {...pageProps} />
          </ConversationProvider>
      </UserProvider>
    </NextAuthProvider>
    
  );
}

export default MyApp;