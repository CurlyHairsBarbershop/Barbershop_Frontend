import { Outlet } from 'react-router';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export const MainLayout: React.FC = () => {
  return (
    <section>
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};
