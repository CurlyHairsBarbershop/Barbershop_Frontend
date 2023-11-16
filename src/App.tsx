import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { BarbersPage } from './pages/BarbersPage/BarbersPage';
import { ServicePage } from './pages/ServicePage/ServicePage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { EnrollPage } from './pages/EnrollPage/EnrollPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'barbers',
        element: <BarbersPage />,
      },
      {
        path: 'services',
        element: <ServicePage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'enroll',
        element: <EnrollPage />,
      },
    ],
  },
  {
    path: 'home',
    element: <Navigate to="/" replace />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'signup',
    element: <SignUpPage />,
  },
]);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
