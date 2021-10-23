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

interface ICustomers {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phonenumber: number;
}

interface IVendors {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phonenumber: number;
    brandname: string;
    services: string;
    location: string;
}