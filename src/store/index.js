import Vue from 'vue'
import Vuex from 'vuex'
import markers from './modules/markers'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {markers}
})
