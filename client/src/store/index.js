import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    footballers: [],
  },
  mutations: {
    initFootballers (state) {
      state.footballers = []
    },
    fetchAllFootballers (state, payload) {
      if (payload != '') {
        for (let newfootballer of payload) {
          let newvalue = 1
          state.footballers.map(footballers => {
            if (newfootballer.Name == footballers.Name)
              newvalue = 0
          })
          if (newvalue)
            state.footballers.push(newfootballer)
        }
      }
    }
  },
  actions: {
    initFootballers ({commit}) {
      commit('initFootballers')
    },
    fetchAllFootballers ({commit, getters}, payload) {
      let page = parseInt(payload) * 12
      const url = `http://localhost:3000/footballers/${page}`
      return axios.get(url)
      .then((response) => {
        commit('fetchAllFootballers', response.data.footballers)
      })
      .catch(function (error) {
        throw error
      })
    }
  },
  getters: {
    getFootballers (state) {
      return state.footballers
    }
  }
})

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}
