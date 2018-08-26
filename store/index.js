import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const link = 'http://localhost:5000'
const pass = 123321
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    auth: false,
    password: 123321,
    popup: false,
    editChannel: null,
    deleteChannel: null,
    channelsWithPackage: null,
    categories: [
      {
        id: 1,
        name: 'Kids'
      }
    ],
    packages: null,
    channels: null
  },
  mutations: {
    popup(state, payload) {
      state.popup = payload
    },
    setChannels(state,payload) {
      state.channels = payload.channels
      state.channelsWithPackage = payload.channelsWithPackage
    },
    editChannel(state, id) {
      state.editChannel = state.channels.find((el) => el.channelId == id)
    },
    deleteChannel(state, id) {
      state.deleteChannel = state.channels.find((el) => el.id == id)
    },
    auth(state, payload) {
      console.log(payload)
      if (state.password == payload) {
        state.auth = true
      }
    }
  },
  actions: {
    createNewChannel({state,commit, dispatch}, object) {
      object.dashboard = pass
      axios.post(`${link}/createChannel`,object)
      .then((ok) => {
        if(ok.status == 201) {
          dispatch('getChannels')
          .then((ok) => {
            
          })
        }
      }) 
      .catch((err) => {
        console.log(err)
      })
    },
    getChannels({state,commit}) {
      axios.post(`${link}/allChannels`,{dashboard: pass})
      .then((res) => {
        console.log(res.data)
        commit('setChannels', res.data)
      })
    },
    getDeleteChannel({state,commit,dispatch}) {
      const body = state.deleteChannel
      body.dashboard = pass
      axios.post(`${link}/deleteChannel`,body)
      .then(() => {
        dispatch('getChannels')
      })
    },
    getUpdateChannel({state,commit,dispatch}, channel) {
      channel.dashboard = pass 
      axios.post(`${link}/updateChannel`, channel)
      .then(() => {
        dispatch('getChannels')
      })
    },
    getCategories({state,commit,dispatch}) {
      
      axios.post(`${link}/getCategories`, {dashboard: pass})
      .then((result) => {
        state.categories = result.data
      })
    },
    getPackages({state,commit,dispatch}) {
      axios.post(`${link}/getPackages`, {dashboard: pass})
      .then((result) => {
        state.packages = result.data
      })
    },
    createNewPackage({state,commit,dispatch}, newPackage) {
      axios.post(`${link}/addPackage`, {name: newPackage, dashboard: pass})
      .then((result) => {
        dispatch('getPackages')
      })
    },
    deleteChannelFromPackage({state,commit,dispatch}, channel ) {
      channel.dashboard = pass
      axios.post(`${link}/deleteFromPackage`, channel)
      .then(() => {
        dispatch('getChannels')
      })
    },
    sortChannels({state,commit,dispatch}, channels) {
      axios.post(`${link}/sortChannels`,{channels: channels,dashboard: pass})
      .then(() => {
        dispatch('getChannels')
      }) 
    },
    addChannelToPackage({state,commit,dispatch}, channels) {
      channels.dashboard = pass
      axios.post(`${link}/addChannelToPackage`,channels)
      .then((ok) => {
        dispatch('getChannels')
      })
    }
  }
})
