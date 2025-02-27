import React, { createContext, useState, ReactNode } from 'react';

type Item = {
  id: number;
  title: string;
  body: string;
};

type ItemContextType = {
  items: Item[];
  loading: boolean;
  error: string | null;
  setItems: (items: Item[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  removeItem:(id:number)=>void;
};

const defaultContext: ItemContextType = {
  items: [],
  loading: false,
  error: null,
  setItems: () => {},
  setLoading: () => {},
  setError: () => {},
  removeItem:()=>{}
};

export const ItemContext = createContext<ItemContextType>(defaultContext);

type ItemProviderProps = {
  children: ReactNode;
};

export const ItemProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id)); 
  };

  return (
    <ItemContext.Provider value={{ items, loading, error, setItems, setLoading, setError,removeItem }}>
      {children}
    </ItemContext.Provider>
  );
};
