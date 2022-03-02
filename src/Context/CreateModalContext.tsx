import { createContext, useRef } from 'react';

const CreateModalContext = createContext<{
  firstFocusableElementRef: any;
  lastFocusableElementRef: any;
  handleFocusTrap: (whichTrap: 'topTrap' | 'bottomTrap') => void;
}>({
  firstFocusableElementRef: {},
  lastFocusableElementRef: {},
  handleFocusTrap: () => {},
});

const CreateModalContextProvider = ({ children }: { children: any }) => {
  const firstFocusableElementRef = useRef<null | any>(null);
  const lastFocusableElementRef = useRef<null | any>(null);

  const handleFocusTrap = (whichTrap: 'topTrap' | 'bottomTrap') => {
    if (whichTrap === 'topTrap') return lastFocusableElementRef.current.focus();
    if (whichTrap === 'bottomTrap' && firstFocusableElementRef.current)
      return firstFocusableElementRef.current.focus();
    if (whichTrap === 'bottomTrap' && !firstFocusableElementRef.current)
      return lastFocusableElementRef.current.focus();
  };

  return (
    <CreateModalContext.Provider
      value={{ firstFocusableElementRef, lastFocusableElementRef, handleFocusTrap }}
    >
      {children}
    </CreateModalContext.Provider>
  );
};

export { CreateModalContext, CreateModalContextProvider };
