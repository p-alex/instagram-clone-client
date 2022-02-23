import { createContext, Dispatch, SetStateAction, useState } from 'react';
import useAxios from '../Hooks/useAxios';
import useAxiosWithRetry from '../Hooks/useAxiosWithRetry';

export interface IUser {
  userId: string;
  username: string;
  profileImg: string;
  accessToken: string;
}

const GlobalContext = createContext<{
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  handleLogout: () => Promise<void>;
}>({
  user: { userId: '', username: '', profileImg: '', accessToken: '' },
  setUser: () => {},
  handleLogout: async () => {},
});
const LOGOUT_USER = `
  mutation {
    logoutUser {
      statusCode
      success
      message
    }
  }
`;
const GlobalContextProvider = ({ children }: { children: any }) => {
  const [logoutUser] = useAxiosWithRetry(LOGOUT_USER, {});

  const [user, setUser] = useState<IUser>({
    userId: '',
    username: '',
    profileImg: '',
    accessToken: '',
  });

  const handleResetUser = () =>
    setUser({ username: '', userId: '', profileImg: '', accessToken: '' });

  const handleLogout = async () => {
    try {
      const { success, message } = await logoutUser();
      if (success) {
        handleResetUser();
      } else {
        throw new Error(message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <GlobalContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
