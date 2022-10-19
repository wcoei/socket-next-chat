import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


interface UserProviderProps {
  children?: any
}

interface UserContextProps {
  user: string
  setUser: Dispatch<SetStateAction<string>>
}

const Context = createContext<UserContextProps | null>(null);

export function UserProvider({ children } : UserProviderProps) {
  const [user, setUser] = useState("");
  return (
    <Context.Provider value={{user, setUser}}>{children}</Context.Provider>
  );
}

export function useUserContext() {
  return useContext(Context);
}