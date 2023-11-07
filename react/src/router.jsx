import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import Users from './views/Users';
import NotFound from './views/NotFound';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Dashboard from './views/Dashboard';
import UserForm from "./views/UserForm.jsx";
import OurProducts from './components/OurProducts.jsx';
import ProductDetail from './components/DetailPage/ProductDetail.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/ourProducts',
                element: <OurProducts />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },
    {
        path: '/productDetail',
        element: <ProductDetail />
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;
