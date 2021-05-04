import Head from 'next/head';
import { useContext } from 'react';
import { Dashboard } from '../components/Dashboard';
import Login from '../components/Login';
import { UserContext } from '../contexts/UserContext';

export default function Home() {
  const user = useContext(UserContext);

  return(
    <>
      <Head>
        <title>Chat</title>
      </Head>
      {user.Id ? <Dashboard /> : <Login />}
    </>
  ) 
}