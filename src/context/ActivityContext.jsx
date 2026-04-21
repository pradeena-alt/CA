import { createContext, useContext, useReducer, useEffect } from "react";
import ActivityReducer from "../reducers/ActivityReducer";
import { getToken, getDataset, sanitizeActivities } from "../api/api";

const ActivityContext = createContext();

const initialState = {
  activities: [],
  loading: true,
};

export const ActivityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenRes = await getToken("E0423037", "801597", "B");

        const raw = await getDataset(tokenRes.token, tokenRes.dataUrl);

        const data = sanitizeActivities(raw);

        dispatch({ type: "SET_DATA", payload: data });
      } catch (err) {
        console.error("ERROR:", err);
      }
    };

    fetchData();
  }, []);

  const toggleGoal = (id) =>
    dispatch({ type: "TOGGLE_GOAL", payload: id });

  return (
    <ActivityContext.Provider
      value={{
        activities: state.activities,
        loading: state.loading,
        toggleGoal,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);