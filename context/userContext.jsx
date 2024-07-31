import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../src/config';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    theme: 'light',
  });

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/User/userById`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      });
      setState((prevState) => ({
        ...prevState,
        user: { email: response.data.user.email },
      }));
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);



  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
