import Head from 'next/head';
import { useContext } from 'react';
import { HomePage } from '../components/HomePage';
import Login from '../components/Login';
import { UserContext } from '../contexts/UserContext';

export default function Home() {
  const user = useContext(UserContext);

  return(
    <>
      <Head>
        <title>Chat</title>
      </Head>
      {user.Id ? <HomePage /> : <Login />}
    </>
  ) 
}