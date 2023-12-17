import { Outlet } from 'react-router';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useAppDispatch } from '../../store/hooks/hooks';
import { useEffect } from 'react';
import { getBarbers } from '../../store/commercial/asyncThunks';
import { getCookie } from '../../helpers/common';
import { getAccount } from '../../store/auth/asyncThunks';

export const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = getCookie('token');

  useEffect(() => {
    dispatch(getBarbers());

    if (token) {
      dispatch(getAccount(token as string));
    }
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
