import axios from 'axios';
import { Base_URL, TOKEN_HEADER_KEY } from '../constants/api_settings';

const API_URL = Base_URL+'movies';

export const getAllContent = async (token, pagination) => {
    return await axios.get(API_URL, 
        {
            headers : {[TOKEN_HEADER_KEY] : token}, 
            params: {
                page: pagination.current,
                limit: pagination.pageSize,
            },
        }
    );
};


export const searchAllContent = async (token, params) => {
    return await axios.get(API_URL+'/search', { headers : {[TOKEN_HEADER_KEY] : token},  params}
    );
};

export const getContent = async (id, token) => {
    return await axios.get(`${API_URL}/${id}`, {headers : {[TOKEN_HEADER_KEY] : token}});
};

export const addContent = async (content, token) => {
    var bodyFormData = new FormData();
        bodyFormData.append('title', content.title);
        bodyFormData.append('description', content.description);
        bodyFormData.append('year', content.year);
        bodyFormData.append('duration', content.duration);
        bodyFormData.append('quality', content.quality);
        bodyFormData.append('language', content.language);
        bodyFormData.append('subtitles', content.subtitles);
        bodyFormData.append('cast', content.cast);
        // bodyFormData.append('genre_ID', content.genre_ID);
        content.genre_ID.forEach(id => bodyFormData.append('genre_ID[]', id));
        bodyFormData.append('videoFile', content.video_file);
        bodyFormData.append('poster', content.poster);
        bodyFormData.append('trailerVideo', content.trailer_video);
        bodyFormData.append('content_type', content.content_type);
        bodyFormData.append('release_date', content.release_date);
    return await axios.post(API_URL, bodyFormData, {headers : {'Content-Type' : 'multipart/form-data', [TOKEN_HEADER_KEY] : token}});
};

export const updateContent = async (id, content, token) => {
    var bodyFormData = new FormData();
        bodyFormData.append('title', content.title);
        bodyFormData.append('description', content.description);
        bodyFormData.append('year', content.year);
        bodyFormData.append('duration', content.duration);
        bodyFormData.append('quality', content.quality);
        bodyFormData.append('language', content.language);
        bodyFormData.append('subtitles', content.subtitles);
        bodyFormData.append('cast', content.cast);
        content.genre_ID.forEach(id => bodyFormData.append('genre_ID[]', id));
        bodyFormData.append('videoFile', content.video_file);
        bodyFormData.append('poster', content.poster);
        bodyFormData.append('trailerVideo', content.trailer_video);
        bodyFormData.append('content_type', content.content_type);
        bodyFormData.append('release_date', content.release_date);
    return await axios.put(`${API_URL}/${id}`, bodyFormData, {headers : {'Content-Type' : 'multipart/form-data', [TOKEN_HEADER_KEY] : token}});
};

export const deleteContent = async (id, token) => {
    return await axios.delete(`${API_URL}/${id}`, {headers : {[TOKEN_HEADER_KEY] : token}});
};

export const getLatestContent = async (token) => {
    return await axios.get(API_URL+'/latest', {headers : {[TOKEN_HEADER_KEY] : token}});
};
