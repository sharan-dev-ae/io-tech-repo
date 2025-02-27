import React, { useEffect, useContext } from 'react';

import { fetchItems } from '../api/ItemService';
import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';
import { ItemContext } from '../context/ItemContext';

const Home: React.FC = () => {
  const { items, loading, error, setItems, setLoading, setError } = useContext(ItemContext);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const fetchedItems = await fetchItems();
        console.log(fetchedItems,"***Test")
        setItems(fetchedItems);
      } catch (error) {
        setError('Failed to fetch items');
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [setItems, setLoading, setError]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Item Management</h1>
      <ItemList />
      <ItemForm />
 
    </div>
  );
};

export default Home;
