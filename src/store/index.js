import { store } from 'quasar/wrappers'
import global from './global'
import equipments from './equipments'
import { createStore } from 'vuex'


export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      global,
      equipments
    },

    // eslint-disable-next-line no-undef
    strict: process.env.DEBUGGING
  })

  return Store
})
