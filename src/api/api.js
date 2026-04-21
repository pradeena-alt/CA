import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async (studentId, password, set) => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId,
    password,
    set,
  });
  return data;
};

export const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

// 🔥 CLEAN DATA
export const validateActivity = (a) => {
  if (!a.activityId || !a.name) return null;

  return {
    activityId: a.activityId,
    name: a.name || "Unknown",
    steps: Number(a.steps) || 0,
    caloriesBurned: Number(a.caloriesBurned) || 0,
    workoutMinutes: Number(a.workoutMinutes) || 0,
    goalAchieved: a.goalAchieved === true || a.goalAchieved === "true",
    date: a.date || "No Date",
  };
};

export const sanitizeActivities = (arr) => {
  if (!Array.isArray(arr)) return [];
  return arr.map(validateActivity).filter((x) => x !== null);
};