import { createContext, useState } from 'react';

const NavBarContext = createContext({
  isCreatePostModalActive: false,
  handleToggleCreatePostModal: () => {},
});

const NavBarContextProvider = ({ children }: { children: any }) => {
  const [isCreatePostModalActive, setIsCreatePostModalActive] = useState(false);
  const handleToggleCreatePostModal = () =>
    setIsCreatePostModalActive(!isCreatePostModalActive);
  return (
    <NavBarContext.Provider
      value={{ isCreatePostModalActive, handleToggleCreatePostModal }}
    >
      {children}
    </NavBarContext.Provider>
  );
};

export { NavBarContext, NavBarContextProvider };
