import RegisterCustomer from '../pages/auth/customer/signup'
import LoginCustomer from '../pages/auth/signin'

const routes: IRoutes[] = [
    {
        path: '/',
        exact: true,
        component: RegisterCustomer,
        name: 'signup',
        protected: false
    },
    {
        path: '/signin',
        exact: true,
        component: LoginCustomer,
        name: 'signin',
        protected: false
    }
]

export default routes;