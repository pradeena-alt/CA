import React, { createContext, useReducer, useEffect, useContext } from 'react';
import ActivityReducer from "../reducer/ActivityReducer";
import { getToken, getDataset, sanitizeActivities } from '../api/api';

export const ActivityContext = createContext();

const STUDENT_ID = 'E0423037';
const PASSWORD = '801597';
const SET = 'setB';

export const ActivityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ActivityReducer, {
    activities: [],
    loading: true,
    error: null,
  });

  // Fetch data on app load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Get token (with set parameter)
        const tokenResponse = await getToken(STUDENT_ID, PASSWORD, SET);

        // Step 2: Get dataset
        const rawData = await getDataset(tokenResponse.token, tokenResponse.dataUrl);
        
        // Step 3: Sanitize data
        const sanitizedData = sanitizeActivities(rawData);
        
        dispatch({ type: 'SET_DATA', payload: sanitizedData });
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message || 'Failed to fetch data';
        console.error('Error in fetchData:', errorMsg);
        dispatch({
          type: 'SET_ERROR',
          payload: errorMsg,
        });
      }
    };

    fetchData();
  }, []);

  const toggleGoal = (activityId) => {
    dispatch({ type: 'TOGGLE_GOAL', payload: activityId });
  };

  const value = {
    activities: state.activities,
    loading: state.loading,
    error: state.error,
    dispatch,
    toggleGoal,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within ActivityProvider');
  }
  return context;
};