import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import AuthService from './AuthService';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

axios.interceptors.request.use(config => {
    config.headers["Authorization"] = `Aelita ${AuthService.getAccessToken()}`;
    return config;
}, error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return AuthService.refreshToken()
            .then(response => {
                originalRequest.headers['Authorization'] = 'Aelita ' + response.data.access;
                return axios(originalRequest);
            })
            .catch(error => {
                console.log('Token yenileme başarısız:', error);
                AuthService.logout();
            });
    }
    return Promise.reject(error);
});

createApp(App)
    .use(router)
    .use(store)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
