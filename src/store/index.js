import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import login from './modules/login'
import users from './modules/users'
import getters from './getter'
import roles from './modules/roles'
import goods from './modules/goods'
import rights from './modules/rights'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    goods,
    rights,
    login,
    users,
    roles
  },
  plugins: [vuexLocal.plugin]
})
