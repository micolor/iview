import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // state
    },
    mutations: {
        //
    },
    actions: {
        // actions
    },
    modules: {
        app,
        user
    }
});

export default store;
