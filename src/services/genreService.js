import axios from 'axios';
import { Base_URL, TOKEN_HEADER_KEY } from '../constants/api_settings';

const API_URL = Base_URL+'genres';

export const getAllGenre = async (token) => {
    return await axios.get(API_URL, {headers : {[TOKEN_HEADER_KEY] : token}});
};

export const getGenre = async (id, token) => {
    return await axios.get(`${API_URL}/${id}`, {headers : {[TOKEN_HEADER_KEY] : token}});
};

// export const addGenre = async (Genre) => {
//     return await axios.post(API_URL, Genre);
// };

export const addGenre = async (genre, token) => {
    try {
      const response = await axios.post(API_URL, genre, {headers : {[TOKEN_HEADER_KEY] : token}});
      return response.data;
    } catch (error) {
      // Error: Can be network or server response
      if (error.response) {
        // Server responded with an error code (e.g., 400, 500)
        console.error('Server error:', error.response.data);
      } else if (error.request) {
        // No response from server
        console.error('No response from server:', error.request);
      } else {
        // Other errors (e.g., bad request setup)
        console.error('Error creating genre:', error.message);
      }
      throw error; // re-throw if you want the caller to handle it too
    }
  };

export const updateGenre = async (id, Genre, token) => {
    return await axios.put(`${API_URL}/${id}`, Genre, {headers : {[TOKEN_HEADER_KEY] : token}});
};

export const deleteGenre = async (id, token) => {
    return await axios.delete(`${API_URL}/${id}`, {headers : {[TOKEN_HEADER_KEY] : token}});
};



