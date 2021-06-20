import axios from "axios";

const state = {
  cities: [],
  currentWeather: null,
  currentLanguage: 'US'
}

const getters = {
  getCities(state) {
    return state.cities
  }
}

const actions = {
  async getWeather({commit}, data) {
    try {
      console.log(process.env.BASE_URL)
      const response = await axios.get(`${process.env.BASE_URL}?q=${data}&lang=${this.state.currentLanguage}&appid=${process.env.API_KEY}`)
      commit('CURRENT_WEATHER', data)
      return response.data
    } catch (error) {
      console.log('error ->', error)
    }
  }
}

const mutations = {
  ADD_TO_HISTORY(state, data) {
    const elem = state.cities.find(item => item.id === data.id)
    if (!elem) {
      state.cities.push(data)
    }
  },
  CURRENT_WEATHER(state, data) {
    state.currentWeather = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}