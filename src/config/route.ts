import MainPage from '../pages/MainPage'
import RegisterCustomer from '../pages/auth/customer/CustomerSignUp'
import LoginCustomer from '../pages/auth/customer/CustomerSignIn'
import CustomerDashboard from '../pages/customers/CustomerDash'
import EditCustomerInfo from '../pages/customers/CustomerEdit'
import RegisterVendor from '../pages/auth/vendor/VendorSignUp'
import LoginVendor from '../pages/auth/vendor/VendorSignIn' 
import VendorDashboard from '../pages/vendors/VendorDash'
import EditVendorInfo from '../pages/vendors/VendorEdit'
import HomePage from '../pages/HomePage'
import SearchPage from '../pages/Search'
import ForgotPassword from '../pages/auth/ForgotPass'
import ChangePassword from '../pages/auth/ChangePass'
import VerifyEmailNotification from '../pages/auth/verifyemail'


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
        protected: true
    },
    {
        path: '/CustomerEdit',
        exact: true,
        component: EditCustomerInfo,
        name: 'CustomerEdit',
        protected: true
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
        protected: true
    },
    {
        path: '/VendorEdit',
        exact: true,
        component: EditVendorInfo,
        name: 'VendorEdit',
        protected: true
    },
    {
        path: '/HomePage',
        exact: true,
        component: HomePage,
        name: 'HomePage',
        protected: true
    },
    {
        path: '/Search',
        exact: true,
        component: SearchPage,
        name: 'Search',
        protected: true
    },
    {
        path: '/ForgotPass',
        exact: true,
        component: ForgotPassword,
        name: 'ForgotPass',
        protected: false
    },
    {
        path: '/ChangePass',
        exact: true,
        component: ChangePassword,
        name: 'ChangePass',
        protected: true
    },
    {
        path: '/verifyemail',
        exact: true,
        component: VerifyEmailNotification,
        name: 'verifyemail',
        protected: true
    }
]

export default routes;
