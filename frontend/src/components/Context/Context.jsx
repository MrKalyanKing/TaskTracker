import { createContext } from "react";

export const AppContext = createContext();

export const CreateContext = ({ children }) => {
  const url = "http://localhost:8000/api";

  return (
    <AppContext.Provider value={url}>
      {children}
    </AppContext.Provider>
  );
};