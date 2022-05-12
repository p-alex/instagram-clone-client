import { createContext, useRef } from "react";

const CreateModalContext = createContext<{
  firstFocusableElementRef: any;
  lastFocusableElementRef: any;
}>({
  firstFocusableElementRef: {},
  lastFocusableElementRef: {},
});

const CreateModalContextProvider = ({ children }: { children: any }) => {
  const firstFocusableElementRef = useRef<null | any>(null);
  const lastFocusableElementRef = useRef<null | any>(null);
  return (
    <CreateModalContext.Provider
      value={{
        firstFocusableElementRef,
        lastFocusableElementRef,
      }}
    >
      {children}
    </CreateModalContext.Provider>
  );
};

export { CreateModalContext, CreateModalContextProvider };
