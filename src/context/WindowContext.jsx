import { createContext, useContext } from 'react';

const WindowContext = createContext(null);

export const WindowProvider = ({ children, id, onClose }) => {
  return (
    <WindowContext.Provider value={{ id, onClose }}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindow = () => {
  const context = useContext(WindowContext);
  return context;
};
