import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        cities: []
    },
    getters: {
        getCities(state) {
            return state.cities
        }
    },
    mutations: {
        DOWNLOAD_FROM_STORE(state, data) {
            state.cities = data
        },
        ADD_TO_HISTORY(state, data) {
            const elem = state.cities.find(item => item.id === data.id)
            if (!elem) {
                state.cities.push(data)
            }
        }
    },
    actions: {
        saveToStore(getters) {
            const state = getters.getCities
            if (state.length > 0) localStorage.setItem('cities', JSON.stringify(state))
        },
        async downloadFromStore({commit, dispatch}) {
            let cities = JSON.parse(localStorage.getItem('cities') || '[]');

            const response = []

            if (cities.length) {
                for (const item of cities) {
                    const res = await dispatch('fetchWeather', item.city)
                    response.push(res)
                }
                commit('DOWNLOAD_FROM_STORE', response)
            }

        },
        async fetchWeather({commit}, city) {
            const response = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=84e2a9ad0b2bca1922b23252454cc8a2`)

            response.data.temperature = response.data
            response.data.cityName = city
            response.data.city = city

            response.data.icon = {
                img: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                description: response.data.weather[0].description,
                main: response.data.weather[0].main
            }
            commit('ADD_TO_HISTORY', city)
            return response.data
        }
    }
})