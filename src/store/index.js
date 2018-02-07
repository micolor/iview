import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import app from './modules/app';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loadingState: false
    },
    getters: {
        loadingState (state) {
            return state.loadingState;
        }
    },
    mutations: {
        [types.SET_LOADING_STATE] (state, flag) {
            state.loadingState = flag;
        }
    },
    actions: {
        SET_LOADING_STATE: ({commit}, flag) => {
            commit(types.SET_LOADING_STATE, flag);
        }
    },
    modules: {
        app,
        user
    }
});

export default store;
