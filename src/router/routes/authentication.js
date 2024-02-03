import { lazy } from 'react'

export const AuthenticationRoutes = [
    {
        path: '/login',
        component: lazy(() => import('../../views/authentication/Login')),
        layout: 'BlankLayout',
        meta: {
          authRoute: true
        }
      },
      {
        path: '/pages/login-basic',
        component: lazy(() => import('../../views/authentication/LoginBasic')),
        layout: 'BlankLayout'
      },
      {
        path: '/pages/login-cover',
        component: lazy(() => import('../../views/authentication/LoginCover')),
        layout: 'BlankLayout'
      },
      {
        path: '/register',
        component: lazy(() => import('../../views/authentication/Register')),
        layout: 'BlankLayout',
        meta: {
          authRoute: true
        }
      },
      {
        path: '/pages/register-basic',
        component: lazy(() => import('../../views/authentication/RegisterBasic')),
        layout: 'BlankLayout'
      },
      {
        path: '/pages/register-cover',
        component: lazy(() => import('../../views/authentication/RegisterCover')),
        layout: 'BlankLayout'
      },
      {
        path: '/forgot-password',
        component: lazy(() => import('../../views/authentication/ForgotPassword')),
        layout: 'BlankLayout',
        meta: {
          authRoute: true
        }
      },
      {
        path: '/pages/forgot-password-basic',
        component: lazy(() => import('../../views/authentication/ForgotPasswordBasic')),
        layout: 'BlankLayout'
      },
      {
        path: '/pages/forgot-password-cover',
        component: lazy(() => import('../../views/authentication/ForgotPasswordCover.js')),
        layout: 'BlankLayout'
      },
      {
        path: '/pages/reset-password-basic',
        component: lazy(() => import('../../views/authentication/ResetPasswordBasic')),
        layout: 'BlankLayout'
      },
      {
        path: '/pages/reset-password-cover',
        component: lazy(() => import('../../views/authentication/ResetPasswordCover')),
        layout: 'BlankLayout'
      },
      {
        path: '/pages/verify-email-basic',
        component: lazy(() => import('../../views/authentication/VerifyEmailBasic')),
        layout: 'BlankLayout'
      },
      {
        path: '/pages/verify-email-cover',
        component: lazy(() => import('../../views/authentication/VerifyEmailCover')),
        layout: 'BlankLayout'
      },
      {
        path: '/pages/two-steps-basic',
        component: lazy(() => import('../../views/authentication/TwoStepsBasic')),
        layout: 'BlankLayout'
      },
      {
        path: '/pages/two-steps-cover',
        component: lazy(() => import('../../views/authentication/TwoStepsCover')),
        layout: 'BlankLayout'
      },
]