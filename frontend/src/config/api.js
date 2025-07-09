// API Configuration for different environments
const API_BASE_URL =  'https://mydrive-production-ede9.up.railway.app';

export const API_ENDPOINTS = {
    // Auth endpoints
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    GET_USER: `${API_BASE_URL}/api/auth/getUser`,
    
    // File endpoints
    UPLOAD_FILE: `${API_BASE_URL}/api/files/upload`,
    GET_FILES: `${API_BASE_URL}/api/files/get-files`,
    GET_FILE: `${API_BASE_URL}/api/files/get-file`,
    DELETE_FILE: `${API_BASE_URL}/api/files/delete-file`,
    INCREMENT_VIEW: `${API_BASE_URL}/api/files/increment-view-count`,
    SEARCH_FILES: `${API_BASE_URL}/api/files/search-files`,
};

export default API_BASE_URL; 