import React, { useEffect, useContext } from 'react';
import { fetchItems } from '../api/ItemService';
import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';
import { ItemContext } from '../context/ItemContext';
import FallbackUI from '../components/FallBackUI';

const Home: React.FC = () => {
  const { items, loading, error, setItems, setLoading, setError } = useContext(ItemContext);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      setError(null); 
      try {
        const fetchedItems = await fetchItems();
        setItems(fetchedItems); 
      } catch (error: any) {
        setError(error.message);  
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [setItems, setLoading, setError]);

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Item Management</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <FallbackUI />  
      ) : (
        <div>
          {items.length === 0 ? (
            <div className="text-center">
              <p>No items found. Add a new item below.</p>
              <ItemForm />
            </div>
          ) : (
            <>
              <ItemList />
              <ItemForm />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
