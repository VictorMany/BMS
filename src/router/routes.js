const routes = [
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Equipments
      {
        path: '',
        name: '/',
        component: () => import('src/pages/Equipments/Equipments.vue')
      },
      {
        path: 'add-equipment',
        name: 'add-equipment',
        component: () => import('src/pages/Equipments/AddEquipment.vue')
      },
      {
        path: 'detail-:id-equipment',
        name: 'detail-equipment',
        component: () => import('src/pages/Equipments/DetailEquipment.vue')
      },
      // Users
      {
        path: 'users',
        name: 'users',
        component: () => import('src/pages/Users/Users.vue')
      },
      {
        path: 'add-user',
        name: 'add-user',
        component: () => import('src/pages/Users/AddUser.vue')
      },
      {
        path: 'detail-:id-user',
        name: 'detail-user',
        component: () => import('src/pages/Users/DetailUser.vue')
      },
      // Calendar
      {
        path: 'calendar',
        name: 'calendar',
        component: () => import('src/pages/CalendarPage.vue')
      },
      // Maintenances
      {
        path: 'maintenances',
        name: 'maintenances',
        component: () => import('src/pages/Maintenances/Maintenances.vue')
      },
      {
        path: 'add-maintenance',
        name: 'add-maintenance',
        component: () => import('src/pages/Maintenances/AddMaintenance.vue')
      },
      {
        path: 'edit-:id-maintenance',
        name: 'edit-maintenance',
        component: () => import('src/pages/Maintenances/AddMaintenance.vue')
      },
      {
        path: 'detail-:id-maintenance',
        name: 'detail-maintenance',
        component: () => import('src/pages/Maintenances/DetailMaintenance.vue')
      },
      // Stats
      {
        path: 'statistical',
        name: 'statistical',
        component: () => import('src/pages/StatisticalPage.vue')
      },
      // Settings
      {
        path: 'settings',
        name: 'settings',
        component: () => import('src/pages/SettingsPage.vue')
      },
      // Reports
      {
        path: 'reports',
        name: 'reports',
        component: () => import('src/pages/ReportsPage.vue')
      },
      // Manintenace plan
      {
        path: 'maintenances-plan',
        name: 'maintenances-plan',
        component: () => import('src/pages/Plans/MaintenancesPlan.vue')
      },
      {
        path: 'add-maintenance-plan',
        name: 'add-maintenance-plan',
        component: () => import('src/pages/Plans/AddMaintenancePlan.vue')
      }
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
