/*
 * @Date: 2020-08-01 19:31:20
 * @LastEditors: wj
 * @Description: 
 */
import Vue from "vue";
import Vuex from "./my-vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    doubleCounter: state => {
      return state.count * 2;
    }
  },
  mutations: {
    add (state) {
      state.count++;
    }
  },
  actions: {
    asyncAdd ({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  modules: {}
});
