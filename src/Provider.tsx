import { createContext, useMemo } from 'react';
import { createStore } from './store';
import { Store } from './types';

export const StoreContext = createContext<Store | null>(null);

export const Provider: React.FC = ({ children }) => {
  const store = useMemo(() => createStore(), []);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
