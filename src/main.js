import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { vuetify, i18n } from './plugins/vuetify'
import CountryFlag from 'vue-country-flag'


Vue.config.productionTip = false

Vue.component('CountryFlag', CountryFlag)

new Vue({
  i18n,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
