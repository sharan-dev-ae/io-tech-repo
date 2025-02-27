import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchItems = async () => {
  try {
    const response = await axios.get(API_URL);
    
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }

    if (!response.data || response.data.length === 0) {
      return []; 
    }

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching items from API:', error.message);
      throw new Error('Failed to fetch items from the server. Please try again later.');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};
