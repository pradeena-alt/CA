import React, { createContext, useReducer, useEffect } from 'react';
import ActivityReducer from './reducer/ActivityReducer';
import { getToken, getDataset } from './api/api';

export const AppContext = createContext();

const STUDENT_ID = 'E0423037';
const PASSWORD = '801597';
const SET = 'B';

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, {
    activities: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenRes = await getToken(STUDENT_ID, PASSWORD, SET);
        const data = await getDataset(tokenRes.token, tokenRes.dataUrl);

        dispatch({
          type: 'SET_DATA',
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Error fetching data',
        });
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};