import MainPage from '../pages/MainPage'
import RegisterCustomer from '../pages/auth/customer/CustomerSignUp'
import LoginCustomer from '../pages/auth/SignIn'
import CustomerDashboard from '../pages/auth/customer/CustomerDash'


const routes: IRoutes[] = [
    {
        path: '/',
        exact: true,
        component: MainPage,
        name: 'MainPage',
        protected: false
    },
    {
        path: '/SignUp',
        exact: true,
        component: RegisterCustomer,
        name: 'SignUp',
        protected: false
    },
    {
        path: '/SignIn',
        exact: true,
        component: LoginCustomer,
        name: 'SignIn',
        protected: false
    },
    {
        path: '/CustomerDash',
        exact: true,
        component: CustomerDashboard,
        name: 'CustomerDash',
        protected: false
    }
]

export default routes;