import axios from 'axios';
import { Base_URL, TOKEN_HEADER_KEY  } from '../constants/api_settings';

const API_URL = Base_URL+'users';

export const addSubscriber = async (user) => {
    return await axios.post(API_URL+'/register/subscriber', user);
};

export const addAdmin= async (user) => {
    return await axios.post(API_URL+'/register/admin', user);
};

export const isValidSubscriber = async (user) => {
    return await axios.post(API_URL+'/login/subscriber', user);
};

export const isValidAdmin = async (user) => {
    return await axios.post(API_URL+'/login/admin', user);
};

export const getAllUser = async () => {
    return await axios.get(API_URL);
};

export const getUser = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const updateUser = async (id, user) => {
    return await axios.put(`${API_URL}/${id}`, user);
};

export const deleteUser = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};



