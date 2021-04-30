import { getSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from './services/api';

interface UserProps {
  Id: string;
  Name: string;
  Image: string;
  Email: string;
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext<UserProps>({} as UserProps);

export function UserProvider({ children }: UserProviderProps) {
  const [User, setUser] = useState<UserProps>({} as UserProps);
  const router = useRouter();

  useEffect(() => {
    getSession().then((res) => {
      if (res != null) {
        api.get(`usersLogIn/${res.user.email}`).then((dbRes) => {
          setUser({
            Id: dbRes.data[0].Id,
            Email: dbRes.data[0].Email,
            Name: res.user.name,
            Image: res.user.image
          })
        })
      } else {
        router.push('/login');
      }
    }); 
  }, [])


  return (
    <UserContext.Provider value={User}>
      {children}
    </UserContext.Provider>
  );
}