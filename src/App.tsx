import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage/HomePage';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { BarbersPage } from './pages/BarbersPage/BarbersPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true, element:<HomePage />
      },
      {
        path: 'barbers', element: <BarbersPage />
      }
    ],
  },
  {
    path: 'home',
    element: <Navigate to="/" replace />,
  },
]);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
