import axios from 'axios';
import { Base_URL, TOKEN_HEADER_KEY } from '../constants/api_settings';

const API_URL = Base_URL+'subscription';

// Add a new subscription
export const addSubscription = async (subscriptionData, token) => {
  try {
    const response = await axios.post(API_URL+'/subscribe', subscriptionData, {
      headers: { [TOKEN_HEADER_KEY]: token },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Error creating subscription:", error.message);
    }
    throw error;
  }
};

// Fetch all subscriptions for a user
export const getUserSubscriptions = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`, {
      headers: { [TOKEN_HEADER_KEY]: token },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Error fetching subscriptions:", error.message);
    }
    throw error;
  }
};

// Cancel a subscription
export const cancelSubscription = async (subscriptionId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${subscriptionId}`, {
      headers: { [TOKEN_HEADER_KEY]: token },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Error cancelling subscription:", error.message);
    }
    throw error;
  }
};




