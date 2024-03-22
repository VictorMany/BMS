import { auth, verifyAuthForDetailEquipment } from './middlewareAuth'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('src/pages/login-page.vue')
  },
  {
    path: '/login/detail-:id-equipment',
    name: 'login-equipment',
    component: () => import('src/pages/login-page.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        meta: [auth],
        component: () => import('src/pages/statistical-page.vue')
      },
      // Equipments
      {
        path: 'equipments',
        name: 'equipments',
        meta: [auth],
        component: () => import('src/pages/Equipments/equipments-page.vue')
      },
      {
        path: 'store',
        name: 'store',
        meta: [auth],
        component: () => import('src/pages/Store/store-page.vue')
      },
      {
        path: 'add-equipment',
        name: 'add-equipment',
        meta: [auth],
        component: () => import('src/pages/Equipments/add-equipment.vue')
      },
      {
        path: 'edit-:id-equipment',
        name: 'edit-equipment',
        meta: [auth],
        component: () => import('src/pages/Equipments/add-equipment.vue')
      },
      {
        path: 'detail-:id-equipment',
        name: 'detail-equipment',
        meta: [verifyAuthForDetailEquipment, auth],
        component: () => import('src/pages/Equipments/detail-equipment.vue')
      },
      // Users
      {
        path: 'users',
        name: 'users',
        meta: [auth],
        component: () => import('src/pages/Users/users-page.vue')
      },
      {
        path: 'add-user',
        name: 'add-user',
        meta: [auth],
        component: () => import('src/pages/Users/add-user.vue')
      },
      {
        path: 'edit-:id-user',
        name: 'edit-user',
        meta: [auth],
        component: () => import('src/pages/Users/add-user.vue')
      },
      {
        path: 'detail-:id-user',
        name: 'detail-user',
        meta: [auth],
        component: () => import('src/pages/Users/detail-user.vue')
      },
      // Calendar
      {
        path: 'calendar',
        name: 'calendar',
        meta: [auth],
        component: () => import('src/pages/calendar-page.vue')
      },
      // Maintenances
      {
        path: 'maintenances',
        name: 'maintenances',
        meta: [auth],
        component: () => import('src/pages/Maintenances/maintenances-page.vue')
      },
      {
        path: 'add-maintenance',
        name: 'add-maintenance',
        props: true,
        meta: [auth],
        component: () => import('src/pages/Maintenances/add-maintenance.vue')
      },
      {
        path: 'edit-:id-maintenance',
        name: 'edit-maintenance',
        meta: [auth],
        component: () => import('src/pages/Maintenances/add-maintenance.vue')
      },
      {
        path: 'detail-:id-maintenance',
        name: 'detail-maintenance',
        meta: [auth],
        component: () => import('src/pages/Maintenances/detail-maintenance.vue')
      },
      // Settings
      {
        path: 'settings',
        name: 'settings',
        meta: [auth],
        component: () => import('src/pages/Settings/settings-page.vue')
      },
      {
        path: 'main-account',
        name: 'main-account',
        meta: [auth],
        component: () => import('src/pages/Settings/main-account.vue')
      },
      {
        path: 'notifications',
        name: 'notifications',
        meta: [auth],
        component: () => import('src/pages/Settings/notifications-page.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        meta: [auth],
        component: () => import('src/pages/Settings/roles-page.vue')
      },
      {
        path: 'colors',
        name: 'colors',
        meta: [auth],
        component: () => import('src/pages/Settings/colors-page.vue')
      },
      {
        path: 'tecnical-support',
        name: 'tecnical-support',
        meta: [auth],
        component: () => import('src/pages/Settings/tecnical-support.vue')
      },
      {
        path: 'about-us',
        name: 'about-us',
        meta: [auth],
        component: () => import('src/pages/Settings/about-us.vue')
      },
      {
        path: 'terms-and-conditions',
        name: 'terms-and-conditions',
        meta: [auth],
        component: () => import('src/pages/Settings/terms-and-conditions.vue')
      },
      // Reports
      {
        path: 'reports',
        name: 'reports',
        meta: [auth],
        component: () => import('src/pages/Reports/reports-page.vue')
      },
      {
        path: 'add-report',
        name: 'add-report',
        meta: [auth],
        component: () => import('src/pages/Reports/add-report.vue')
      },
      {
        path: 'edit-:id-report',
        name: 'edit-report',
        meta: [auth],
        component: () => import('src/pages/Reports/add-report.vue')
      },
      {
        path: 'detail-:id-report',
        name: 'detail-report',
        meta: [auth],
        component: () => import('src/pages/Reports/detail-report.vue')
      },
      // Manintenace plan
      {
        path: 'maintenances-plan',
        name: 'maintenances-plan',
        meta: [auth],
        component: () => import('src/pages/Plans/maintenances-plan.vue')
      },
      {
        path: 'add-maintenance-plan',
        name: 'add-maintenance-plan',
        meta: [auth],
        component: () => import('src/pages/Plans/add-maintenance-plan.vue')
      },
      {
        path: 'edit-:id-maintenance-plan',
        name: 'edit-maintenance-plan',
        meta: [auth],
        component: () => import('src/pages/Plans/add-maintenance-plan.vue')
      },
      {
        path: 'detail-:id-maintenance-plan',
        name: 'detail-maintenance-plan',
        meta: [auth],
        component: () => import('src/pages/Plans/detail-maintenance-plan.vue')
      },
      // Service contract
      {
        path: 'contracts',
        name: 'contracts',
        meta: [auth],
        component: () => import('src/pages/Contracts/contracts-page.vue')
      },
      {
        path: 'add-contract',
        name: 'add-contract',
        meta: [auth],
        component: () => import('src/pages/Contracts/add-contract.vue')
      },
      {
        path: 'edit-:id-contract',
        name: 'edit-contract',
        meta: [auth],
        component: () => import('src/pages/Contracts/add-contract.vue')
      },
      {
        path: 'detail-:id-contract',
        name: 'detail-contract',
        meta: [auth],
        component: () => import('src/pages/Contracts/detail-contract.vue')
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
