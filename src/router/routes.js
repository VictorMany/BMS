const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: '/', component: () => import('src/pages/EquipmentsPage.vue') },
      { path: 'calendar', name: 'calendar', component: () => import('src/pages/CalendarPage.vue') },
      { path: 'maintenances', name: 'maintenances', component: () => import('src/pages/MaintenancesPage.vue') },
      { path: 'statistical', name: 'statistical', component: () => import('src/pages/StatisticalPage.vue') },
      { path: 'settings', name: 'settings', component: () => import('src/pages/SettingsPage.vue') },
      { path: 'users', name: 'users', component: () => import('src/pages/UsersPage.vue') },
      { path: 'reports', name: 'reports', component: () => import('src/pages/ReportsPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
