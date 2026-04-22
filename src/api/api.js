import axios from 'axios';

const BASE_URL = 'https://t4e-testserver.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Store token and dataUrl in localStorage
let authToken = localStorage.getItem('authToken');
let dataEndpoint = localStorage.getItem('dataEndpoint') || '/private/data';

// Add interceptor to attach token to all requests
api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

/**
 * Step 1: Authenticate and get token
 * @param {string} studentId - Student's register number
 * @param {string} password - Student's password
 * @param {string} set - Question paper set (e.g., "setA")
 */
export const getToken = async (studentId, password, set = 'setA') => {
  try {
    console.log('Attempting to get token with:', { studentId, set });
    const response = await axios.post(`${BASE_URL}/public/token`, {
      studentId,
      password,
      set,
    });
    authToken = response.data.token;
    dataEndpoint = response.data.dataUrl;
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('dataEndpoint', dataEndpoint);
    console.log('Token obtained successfully');
    console.log('Data URL:', response.data.dataUrl);
    return response.data;
  } catch (error) {
    console.error('Token fetch failed:', error.response?.data || error.message);
    console.error('Full error:', error);
    throw error;
  }
};

/**
 * Step 2: Fetch dataset using authenticated token
 */
export const getDataset = async (token, dataUrl) => {
  const response = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Handle nested data structure: response.data.data.activities
  const responseData = response.data.data;
  if (responseData.activities && Array.isArray(responseData.activities)) {
    return responseData.activities;
  }
  
  // Fallback for different structure
  return Array.isArray(responseData) ? responseData : [];
};

/**
 * Validate individual activity
 */
export const validateActivity = (activity) => {
  // Only skip if activityId is missing
  if (!activity || !activity.activityId) {
    return null;
  }

  return {
    activityId: activity.activityId,
    name: String(activity.name || "").trim() || "Unknown",
    steps: Math.max(0, Number(activity.steps) || 0),
    caloriesBurned: Math.max(0, Number(activity.caloriesBurned) || 0),
    workoutMinutes: Math.max(0, Number(activity.workoutMinutes) || 0),
    goalAchieved: Boolean(activity.goalAchieved) || false,
    date: activity.date || "No Date",
  };
};

/**
 * Sanitize and validate entire dataset
 */
export const sanitizeActivities = (activities) => {
  if (!Array.isArray(activities)) return [];
  return activities
    .map(validateActivity)
    .filter((activity) => activity !== null);
};

export default api;