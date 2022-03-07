import { createContext, Dispatch, SetStateAction, useState } from 'react';
import useAxiosWithRetry from '../Hooks/useAxiosWithRetry';

export interface ILoggedInUser {
  userId: string;
  username: string;
  profileImg: string;
  accessToken: string;
}

const GlobalContext = createContext<{
  user: ILoggedInUser | null;
  setUser: Dispatch<SetStateAction<ILoggedInUser | null>>;
  handleLogout: () => Promise<void>;
}>({
  user: null,
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
  const [user, setUser] = useState<ILoggedInUser | null>(null);

  const [logoutUser] = useAxiosWithRetry({
    query: LOGOUT_USER,
    variables: {},
    accessToken: user?.accessToken,
  });

  const handleResetUser = () => setUser(null);

  const handleLogout = async () => {
    if (user?.accessToken) {
      try {
        const { statusCode } = await logoutUser();

        if (statusCode === 200 || statusCode === 401) {
          handleResetUser();
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };
  return (
    <GlobalContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
