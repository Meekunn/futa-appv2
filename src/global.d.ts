interface IApp {}

interface IAuthRoute {}

interface IPageProps {
    name?: string;
}

interface IRoutes {
    path: string;
    exact: boolean;
    component: any;
    name: string;
    protected: boolean;
    props?: any;
}

interface ICustomerBasic {
    firstname: string;
    lastname: string;
    email:string;
    phonenumber: string;
}

interface ICustomers extends ICustomerBasic {
    id: string;
    password: string;
}

interface IVendorBasic {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    brandname: string;
    services: string;
    location: string;
}

interface IVendors extends IVendorBasic{
    id: string;
    password: string;
}

// interface IVendors [] =  {
//     firstname: string;
//     lastname: string;
//     email: string;
//     phonenumber: string;
//     brandname: string;
//     services: string;
//     location: string;
// }

interface State {
    password: string;
    showPassword: boolean;
  }