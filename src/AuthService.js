// AuthService.js

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'; // JWT sağlayıcınızın API adresi

class AuthService {
    login(credentials) {
         axios.post(
            `${API_URL}token/`,
            credentials,
            {
                "Content-Type": "application/json"
            },
            );

    }
    logout() {
        // Remove the access token and any other user-related data from local storage
        localStorage.removeItem('access');
        localStorage.removeItem('user');
        localStorage.removeItem('refresh');
    }

    register(user) {
        return axios.post(`${API_URL}/register`, user);
    }

    getAccessToken() {
        sessionStorage.setItem('pars', 'aim')

        return localStorage.getItem('access');
    }

    setAccessToken(token) {
        localStorage.setItem('access', token);
    }

    removeAccessToken() {
        localStorage.removeItem('access');
    }

    refreshToken() {
        const refreshToken = localStorage.getItem('refresh');

        if (!refreshToken) {
            return Promise.reject('No refresh token available');
        }

        return axios.post(`${API_URL}refresh/`, { refreshToken })
            .then(response => {
                const newAccessToken = response.data.access;
                this.setAccessToken(newAccessToken); // Update the access token
                return newAccessToken;
            });
    }
}

export default new AuthService();
