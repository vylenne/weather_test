import { $http } from '@/plugins/axios'
import { i18n } from '@/plugins/i18n'

function saveWeather() {
  const parsed = JSON.stringify(state.history)
  localStorage.setItem('history', parsed)
}

const state = {
  history: localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : [],
  currentWeather: null,
  isLoading: false,
  error: null
}

const getters = {
  currentWeather: state => state.currentWeather,
  isLoading: state => state.isLoading,
  error: state => state.error,
  history: state => state.history
}

const actions = {
  async getWeather({commit}, data) {
    try {
      commit('CHANGE_LOADING', true)
      commit('SET_ERROR', null)
      commit('SET_WEATHER', null)
      const response = await $http.get(`weather?q=${data}&lang=${i18n.locale}&appid=${process.env.VUE_APP_API_KEY}`)
      commit('ADD_TO_HISTORY', data)
      commit('SET_WEATHER', response.data)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
    } finally {
      commit('CHANGE_LOADING', false)
    }
  }
}

const mutations = {
  ADD_TO_HISTORY(state, name) {
    const hasElement = state.history.some(e => e === name)
    if (!hasElement)
    state.history.unshift(name)
    saveWeather()
  },
  SET_WEATHER(state, data) {
    state.currentWeather = data
  },
  CHANGE_LOADING(state, status) {
    state.isLoading = status
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}