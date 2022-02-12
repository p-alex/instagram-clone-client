import { createContext, useState } from 'react';

const AppContext = createContext<{
  user: { userId: ''; accessToken: '' };
  setUser: any;
}>({
  user: { userId: '', accessToken: '' },
  setUser: () => {},
});

const ContextWrapper = ({ children }: { children: any }) => {
  const [user, setUser] = useState<{ userId: ''; accessToken: '' }>({
    userId: '',
    accessToken: '',
  });
  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
};

export { AppContext, ContextWrapper };
