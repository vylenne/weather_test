import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    cities: [],
    currentWeather: null,
    currentLanguage: 'US'
  },
  getters: {
    getCities(state) {
      return state.cities
    }
  },
  mutations: {
    ADD_TO_HISTORY(state, data) {
      const elem = state.cities.find(item => item.id === data.id)
      if (!elem) {
        state.cities.push(data)
      }
    },
    CURRENT_WEATHER(state, data) {
      state.currentWeather = data
    }
  },
  actions: {
    saveToStore(getters) {
      const state = getters.getCities
      if (state.length > 0) localStorage.setItem('cities', JSON.stringify(state))
    },
    async getWeather({commit}, data) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data}&lang=${this.state.currentLanguage}&appid=84e2a9ad0b2bca1922b23252454cc8a2`)
        commit('CURRENT_WEATHER', data)
        return response.data
      } catch (error) {
        console.log('error ->', error)
      }
    }
  }
})