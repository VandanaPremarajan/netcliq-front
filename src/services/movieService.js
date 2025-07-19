import axios from 'axios';
import { Base_URL, TOKEN_HEADER_KEY } from '../constants/api_settings';

const API_URL = Base_URL+'movies';

export const getAllContent = async (token) => {
    return await axios.get(API_URL, {headers : {[TOKEN_HEADER_KEY] : token}});
};

export const getContent = async (id, token) => {
    return await axios.get(`${API_URL}/${id}`, {headers : {[TOKEN_HEADER_KEY] : token}});
};

export const addContent = async (content, token) => {
    console.log(content);
    var bodyFormData = new FormData();
        bodyFormData.append('title', content.title);
        console.log(1);
        bodyFormData.append('description', content.description);
        console.log(2);
        bodyFormData.append('year', content.year);
        console.log(3);
        bodyFormData.append('duration', 'nil');
        console.log(4);
        bodyFormData.append('quality', content.quality);
        console.log(5);
        bodyFormData.append('language', content.language);
        console.log(6);
        bodyFormData.append('subtitles', content.subtitles);
        console.log(7);
        bodyFormData.append('cast', content.cast);
        console.log(8);
        // bodyFormData.append('genre_ID', content.genre_ID);
        content.genre_ID.forEach(id => bodyFormData.append('genre_ID[]', id));
        console.log(content.poster);
        bodyFormData.append('videoFile', content.poster);
        console.log(10);
        bodyFormData.append('poster', content.poster);
        bodyFormData.append('trailerVideo', content.poster);
        bodyFormData.append('content_type', content.content_type);
        bodyFormData.append('is_premium', content.is_premium);
        bodyFormData.append('release_date', content.release_date);
        console.log(bodyFormData);
    return await axios.post(API_URL, bodyFormData, {headers : {'Content-Type' : 'multipart/form-data', [TOKEN_HEADER_KEY] : token}});
};

export const updateContent = async (id, content, token) => {
    return await axios.put(`${API_URL}/${id}`, content, {headers : {[TOKEN_HEADER_KEY] : token}});
};

export const deleteContent = async (id, token) => {
    return await axios.delete(`${API_URL}/${id}`, {headers : {[TOKEN_HEADER_KEY] : token}});
};



