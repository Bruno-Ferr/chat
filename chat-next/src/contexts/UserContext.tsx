import { getSession } from 'next-auth/client';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

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

  useEffect(() => {
    getSession().then((res) => {
      if (res != null) {
        api.get(`usersLogIn/${res.user.email}`).then((dbRes) => {
          setUser({
            Id: dbRes.data[0].id,
            Email: dbRes.data[0].Email,
            Name: res.user.name,
            Image: res.user.image
          })
        })
      }
    }); 
  }, [])


  return (
    <UserContext.Provider value={User}>
      {children}
    </UserContext.Provider>
  );
}