const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/EquipmentsPage.vue') },
      { path: 'calendar', component: () => import('src/pages/CalendarPage.vue') },
      { path: 'maintenances', component: () => import('src/pages/MaintenancesPage.vue') },
      { path: 'statistical', component: () => import('src/pages/StatisticalPage.vue') },
      { path: 'settings', component: () => import('src/pages/SettingsPage.vue') },
      { path: 'users', component: () => import('src/pages/UsersPage.vue') },
      { path: 'reports', component: () => import('src/pages/ReportsPage.vue') }
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
