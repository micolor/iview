'use strict';

import axios from 'axios';
import qs from 'qs';
import store from '../store';

axios.defaults.baseURL = 'http://www.myapi.cc';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.timeout = 1000;

axios.interceptors.request.use(function (config) {
    store.commit('setLoadingState', true);
    if (localStorage.token) {
        config.headers.Authorization = localStorage.token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    store.commit('setLoadingState', false);
    return checkStatus(response);
}, function (error) {
    return Promise.reject(error);
});

function checkStatus (response) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response;
    } else {
        response = {
            status: -404,
            msg: '访问失败稍后再试'
        };
        return response;
    }
}

export default {
    post (url, params) {
        return axios({
            method: 'post',
            url,
            data: qs.stringify(params)
        }).then(
            (response) => {
                return response;
            }
        );
    },
    get (url, params) {
        return axios({
            method: 'get',
            url,
            params
        }).then(
            (response) => {
                return response;
            }
        );
    }
};
