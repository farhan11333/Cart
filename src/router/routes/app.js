import { lazy } from 'react'

export const AppRoutes = [
          {
            path: '/calendar',
            component: lazy(() => import('../../views/apps/calendar'))
          },
          {
            path: '/checkout',
            component: lazy(() => import('../../views/apps/ecommerce/checkout'))
          }
]