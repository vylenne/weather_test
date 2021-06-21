import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { vuetify } from './plugins/vuetify'
import { i18n } from './plugins/i18n'

Vue.config.productionTip = false

new Vue({
  i18n,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
