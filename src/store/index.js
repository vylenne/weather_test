import Vue from 'vue'
import Vuex from 'vuex'
import { camelCase } from 'lodash'

Vue.use(Vuex)

const requireModule = require.context('./modules/', true, /\.js$/)
const modules = {}

requireModule.keys().forEach((fileName) => {
  const moduleName = camelCase(
    fileName.replace('./', '').replace('.js', '')
  )

  modules[moduleName] = {
    namespaced: true,
    ...requireModule(fileName).default
  }
})

export default new Vuex.Store({
  modules
})