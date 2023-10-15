import { createStore } from "vuex";

export default createStore({
  state: {
    cookies: [],
    authenticated: false
  },
  getters: {
    get_cookie(state){
      return state.cookies
    }
  },
  mutations: {
    setCookies(state, cookies) {
      state.cookies = cookies;
    },
    SET_AUTH(state, auth) {
      state.authenticated = auth;
    },

  },
  actions: {
    setAuth({ commit }, auth) {
      commit('SET_AUTH', auth);
    },
  },
  modules: {},
});