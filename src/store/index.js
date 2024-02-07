import { store } from 'quasar/wrappers'
import global from './global'
import equipments from './equipments'
import maintenances from './maintenances'
import maintenancePlans from './maintenances-plan'
import users from './users'
import reports from './reports'
import stats from './stats'
import { createStore } from 'vuex'


export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      global,
      equipments,
      maintenances,
      maintenancePlans,
      users,
      reports,
      stats,
    },

    // eslint-disable-next-line no-undef
    strict: process.env.DEBUGGING
  })

  return Store
})
