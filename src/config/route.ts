import MainPage from '../pages/MainPage'
import RegisterCustomer from '../pages/auth/customer/CustomerSignUp'
import LoginCustomer from '../pages/auth/customer/CustomerSignIn'
import CustomerDashboard from '../pages/auth/customer/CustomerDash'
import EditCustomerInfo from '../pages/auth/customer/CustomerEdit'
import RegisterVendor from '../pages/auth/vendor/VendorSignUp'
import LoginVendor from '../pages/auth/vendor/VendorSignIn' 
import VendorDashboard from '../pages/auth/vendor/VendorDash'
import EditVendorInfo from '../pages/auth/vendor/VendorEdit'
import HomePage from '../pages/HomePage'


const routes: IRoutes[] = [
    {
        path: '/',
        exact: true,
        component: MainPage,
        name: 'MainPage',
        protected: false
    },
    {
        path: '/CustomerSignUp',
        exact: true,
        component: RegisterCustomer,
        name: 'CustomerSignUp',
        protected: false
    },
    {
        path: '/CustomerSignIn',
        exact: true,
        component: LoginCustomer,
        name: 'CustomerSignIn',
        protected: false
    },
    {
        path: '/CustomerDash',
        exact: true,
        component: CustomerDashboard,
        name: 'CustomerDash',
        protected: false
    },
    {
        path: '/CustomerEdit',
        exact: true,
        component: EditCustomerInfo,
        name: 'CustomerEdit',
        protected: false
    },
    {
        path: '/VendorSignUp',
        exact: true,
        component: RegisterVendor,
        name: 'VendorSignUp',
        protected: false
    },
    {
        path: '/VendorSignIn',
        exact: true,
        component: LoginVendor,
        name: 'VendorSignIn',
        protected: false
    },
    {
        path: '/VendorDash',
        exact: true,
        component: VendorDashboard,
        name: 'VendorDash',
        protected: false
    },
    {
        path: '/VendorEdit',
        exact: true,
        component: EditVendorInfo,
        name: 'VendorEdit',
        protected: false
    },
    {
        path: '/HomePage',
        exact: true,
        component: HomePage,
        name: 'HomePage',
        protected: false
    }
]

export default routes;

//npm install -g firebase-tools
//yarn add firebase-tools
//$ firebase init
//$ firebase deploy
