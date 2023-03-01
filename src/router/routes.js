const routes = [
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('src/pages/StatisticalPage.vue')
      },
      // Equipments
      {
        path: 'equipments',
        name: 'equipments',
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
        path: 'edit-:id-user',
        name: 'edit-user',
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
        component: () => import('src/pages/Reports/Reports.vue')
      },
      {
        path: 'add-report',
        name: 'add-report',
        component: () => import('src/pages/Reports/AddReport.vue')
      },
      {
        path: 'edit-:id-report',
        name: 'edit-report',
        component: () => import('src/pages/Reports/AddReport.vue')
      },
      {
        path: 'detail-:id-report',
        name: 'detail-report',
        component: () => import('src/pages/Reports/DetailReport.vue')
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
      },
      {
        path: 'edit-:id-maintenance-plan',
        name: 'edit-maintenance-plan',
        component: () => import('src/pages/Plans/AddMaintenancePlan.vue')
      },
      {
        path: 'detail-:id-maintenance-plan',
        name: 'detail-maintenance-plan',
        component: () => import('src/pages/Plans/DetailMaintenancePlan.vue')
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
