import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const link = window.link || 'http://172.29.95.33:5000'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    auth: false,
    password: 123321,
    popup: false,
    editChannel: null,
    deleteChannel: null,
    channelsWithPackage: null,
    operators: null,
    history: null,
    categories: null,
    packages: null,
    users: null,
    channels: null
  },
  mutations: {
    popup (state, payload) {
      state.popup = payload
    },
    setChannels (state, payload) {
      state.channels = payload.channels
      state.channelsWithPackage = payload.channelsWithPackage
    },
    editChannel (state, id) {
      state.editChannel = state.channels.find(el => el.id == id)
    },
    deleteChannel (state, id) {
      state.deleteChannel = state.channels.find(el => el.id == id)
    },
    auth (state, payload) {
      state.auth = true
      state.password = payload
    },
    setOperators (state, operators) {
      state.operators = operators
    },
    setUsers (state, users) {
      state.users = users
    },
    setHistory (state, payload) {
      state.history = payload
    }
  },
  actions: {
    authAdmin ({ commit }, payload) {
      return axios.post(`${link}/authAdmin`, { password: payload }).then(ok => {
        commit('auth', payload)
      })
    },
    createNewChannel ({ state, commit, dispatch }, object) {
      object.dashboard = state.password
      axios
        .post(`${link}/createChannel`, object)
        .then(ok => {
          if (ok.status == 201) {
            dispatch('getChannels').then(ok => {})
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getChannels ({ state, commit }) {
      axios
        .post(`${link}/allChannels`, { dashboard: state.password })
        .then(res => {
          commit('setChannels', res.data)
        })
    },
    getDeleteChannel ({ state, commit, dispatch }) {
      const body = state.deleteChannel
      body.dashboard = state.password
      axios.post(`${link}/deleteChannel`, body).then(() => {
        dispatch('getChannels')
      })
    },

    getUpdateChannel ({ state, commit, dispatch }, channel) {
      channel.dashboard = state.password
      axios.post(`${link}/updateChannel`, channel).then(() => {
        dispatch('getChannels')
      })
    },
    getCategories ({ state, commit, dispatch }) {
      axios
        .post(`${link}/getCategories`, { dashboard: state.password })
        .then(result => {
          state.categories = result.data
        })
    },
    deleteCategory ({commit, state, dispatch}, id) {
      axios
      .post(`${link}/deleteCategories`, { dashboard: state.password, id })
      .then(() => {
        return dispatch('getCategories')
      })
    },
    editCategory ({commit, state, dispatch}, body) {
      body.dashboard = state.password
      axios
      .post(`${link}/editCategories`, body)
      .then(() => {
        return dispatch('getCategories')
      })
    },
    getPackages ({ state, commit, dispatch }) {
      axios
        .post(`${link}/getPackages`, { dashboard: state.password })
        .then(result => {
          state.packages = result.data
        })
    },
    updatePackage ({ state, commit, dispatch }, editPackage) {
      editPackage.dashboard = state.password
      axios.post(`${link}/updatePackage`, editPackage).then(result => {
        dispatch('getPackages')
      })
    },
    createNewPackage ({ state, commit, dispatch }, newPackage) {
      newPackage.dashboard = state.password
      axios.post(`${link}/addPackage`, newPackage).then(result => {
        dispatch('getPackages')
      })
    },
    deletePackage ({ state, dispatch }, body) {
      body.dashboard = state.password
      axios.post(`${link}/deletePackage`, body).then(() => {
        dispatch('getPackages').then(() => {
          dispatch('getUsers')
        })
      })
    },
    deleteChannelFromPackage ({ state, commit, dispatch }, channel) {
      channel.dashboard = state.password
      axios.post(`${link}/deleteFromPackage`, channel).then(() => {
        dispatch('getChannels')
      })
    },
    sortChannels ({ state, commit, dispatch }, channels) {
      axios
        .post(`${link}/sortChannels`, {
          channels: channels,
          dashboard: state.password
        })
        .then(() => {
          dispatch('getChannels')
        })
    },
    addChannelToPackage ({ state, commit, dispatch }, channels) {
      channels.dashboard = state.password
      axios.post(`${link}/addChannelToPackage`, channels).then(ok => {
        dispatch('getChannels')
      })
    },
    createNewCategory ({ state, commit, dispatch }, body) {
      body.dashboard = state.password
      axios.post(`${link}/addNewCategory`, body).then(() => {
        dispatch('getCategories')
      })
    },
    getOperators ({ state, commit }) {
      axios
        .post(`${link}/getOperators`, { dashboard: state.password })
        .then(res => {
          commit('setOperators', res.data)
        })
    },
    updateOperator ({ state, dispatch }, body) {
      body.dashboard = state.password
      axios.post(`${link}/updateOperator`, body).then(() => {
        dispatch('getOperators')
      })
    },
    createNewOperator ({ state, dispatch }, body) {
      body.dashboard = state.password
      axios.post(`${link}/createNewOperator`, body).then(() => {
        dispatch('getOperators')
      })
    },
    getUsers ({ state, commit, dispatch }) {
      const body = {
        dashboard: state.password
      }
      axios.post(`${link}/getUsers`, body).then(res => {
        commit('setUsers', res.data)
        dispatch('getHistory')
      })
    },
    createNewUser ({ state, dispatch }, body) {
      body.dashboard = state.password
      axios.post(`${link}/createNewUser`, body).then(() => {
        dispatch('getUsers')
      })
    },
    updateUser ({ state, dispatch }, body) {
      body.dashboard = state.password
      axios.post(`${link}/updateUser`, body).then(() => {
        dispatch('getUsers')
      })
    },
    deleteUser ({ state, dispatch }, body) {
      body.dashboard = state.password
      axios.post(`${link}/deleteUser`, body).then(() => {
        dispatch('getUsers')
      })
    },
    getHistory ({ commit, state }) {
      axios
        .post(`${link}/userHistoryAll`, { dashboard: state.password })
        .then(result => {
          commit('setHistory', result.data)
        })
    }
  }
})
