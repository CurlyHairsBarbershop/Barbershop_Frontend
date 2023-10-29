import { Outlet } from 'react-router';
import { Header } from '../../components/Header/Header';

export const MainLayout: React.FC = () => {
  return (
    <section>
      <Header />
      <Outlet />
    </section>
  );
};
