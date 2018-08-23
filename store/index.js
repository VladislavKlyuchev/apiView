import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    auth: false,
    password: 123321
  },
  mutations: {
    auth(state, payload) {
        console.log(payload)
      if (state.password == payload) {
        state.auth = true
      }
    }
  }
})
