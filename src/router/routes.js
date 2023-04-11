const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('src/pages/login.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('src/pages/statistical-page.vue')
      },
      // Equipments
      {
        path: 'equipments',
        name: 'equipments',
        component: () => import('src/pages/Equipments/equipments.vue')
      },
      {
        path: 'add-equipment',
        name: 'add-equipment',
        component: () => import('src/pages/Equipments/add-equipment.vue')
      },
      {
        path: 'edit-:id-equipment',
        name: 'edit-equipment',
        component: () => import('src/pages/Equipments/add-equipment.vue')
      },
      {
        path: 'detail-:id-equipment',
        name: 'detail-equipment',
        component: () => import('src/pages/Equipments/detail-equipment.vue')
      },
      // Users
      {
        path: 'users',
        name: 'users',
        component: () => import('src/pages/Users/users.vue')
      },
      {
        path: 'add-user',
        name: 'add-user',
        component: () => import('src/pages/Users/add-user.vue')
      },
      {
        path: 'edit-:id-user',
        name: 'edit-user',
        component: () => import('src/pages/Users/add-user.vue')
      },
      {
        path: 'detail-:id-user',
        name: 'detail-user',
        component: () => import('src/pages/Users/detail-user.vue')
      },
      // Calendar
      {
        path: 'calendar',
        name: 'calendar',
        component: () => import('src/pages/calensar-page.vue')
      },
      // Maintenances
      {
        path: 'maintenances',
        name: 'maintenances',
        component: () => import('src/pages/Maintenances/maintenances.vue')
      },
      {
        path: 'add-maintenance',
        name: 'add-maintenance',
        component: () => import('src/pages/Maintenances/add-maintenance.vue')
      },
      {
        path: 'edit-:id-maintenance',
        name: 'edit-maintenance',
        component: () => import('src/pages/Maintenances/add-maintenance.vue')
      },
      {
        path: 'detail-:id-maintenance',
        name: 'detail-maintenance',
        component: () => import('src/pages/Maintenances/detail-maintenance.vue')
      },
      // Settings
      {
        path: 'settings',
        name: 'settings',
        component: () => import('src/pages/Settings/settings.vue')
      },
      {
        path: 'main-account',
        name: 'main-account',
        component: () => import('src/pages/Settings/main-account.vue')
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: () => import('src/pages/Settings/notifications.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('src/pages/Settings/roles.vue')
      },
      {
        path: 'colors',
        name: 'colors',
        component: () => import('src/pages/Settings/colors.vue')
      },
      {
        path: 'tecnical-support',
        name: 'tecnical-support',
        component: () => import('src/pages/Settings/tecnical-support.vue')
      },
      {
        path: 'about-us',
        name: 'about-us',
        component: () => import('src/pages/Settings/about-us.vue')
      },
      {
        path: 'terms-and-conditions',
        name: 'terms-and-conditions',
        component: () => import('src/pages/Settings/terms-and-conditions.vue')
      },
      // Reports
      {
        path: 'reports',
        name: 'reports',
        component: () => import('src/pages/Reports/reports.vue')
      },
      {
        path: 'add-report',
        name: 'add-report',
        component: () => import('src/pages/Reports/add-report.vue')
      },
      {
        path: 'edit-:id-report',
        name: 'edit-report',
        component: () => import('src/pages/Reports/add-report.vue')
      },
      {
        path: 'detail-:id-report',
        name: 'detail-report',
        component: () => import('src/pages/Reports/detail-report.vue')
      },
      // Manintenace plan
      {
        path: 'maintenances-plan',
        name: 'maintenances-plan',
        component: () => import('src/pages/Plans/maintenances-plan.vue')
      },
      {
        path: 'add-maintenance-plan',
        name: 'add-maintenance-plan',
        component: () => import('src/pages/Plans/add-maintenance-plan.vue')
      },
      {
        path: 'edit-:id-maintenance-plan',
        name: 'edit-maintenance-plan',
        component: () => import('src/pages/Plans/add-maintenance-plan.vue')
      },
      {
        path: 'detail-:id-maintenance-plan',
        name: 'detail-maintenance-plan',
        component: () => import('src/pages/Plans/detail-maintenance-plan.vue')
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
