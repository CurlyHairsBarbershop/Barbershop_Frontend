import { Outlet } from 'react-router';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useAppDispatch } from '../../store/hooks/hooks';
import { useEffect } from 'react';
import { getBarbers } from '../../store/commercial/asyncThunks';

export const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBarbers());
  }, []);
  return (
    <>
      <section>
        <Header />
        <Outlet />
      </section>
      <Footer />
    </>
  );
};
