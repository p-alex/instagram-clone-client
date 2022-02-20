import { createContext, Dispatch, SetStateAction, useState } from 'react';

export interface IUser {
  userId: string;
  username: string;
  profileImg: string;
  accessToken: string;
}

const AppContext = createContext<{
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
}>({
  user: { userId: '', username: '', profileImg: '', accessToken: '' },
  setUser: () => {},
});

const ContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<IUser>({
    userId: '',
    username: '',
    profileImg: '',
    accessToken: '',
  });
  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
};

export { AppContext, ContextProvider };
