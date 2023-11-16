import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import {
  HeaderWrapper,
  Logo,
  SectionList,
  Section,
  SectionsWrapper,
} from './styled';
import { getAccount } from '../../store/auth/asyncThunks';
import { getCookie } from '../../helpers/common';

export const Header = () => {
  const token = getCookie('token');
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  

  useEffect(() => {
    dispatch(getAccount(token as string));
  }, [dispatch]);

  return (
    <HeaderWrapper>
      <SectionsWrapper>
        <Logo src="src/public/images/Header/logo.svg" preview={false} />
        <SectionList>
          <Section to="/">Home</Section>
          <Section to="/barbers">Barbers</Section>
          <Section to="/services">Services</Section>
          {isAuth && <Section to="/profile">Profile</Section>}
        </SectionList>
      </SectionsWrapper>
      <Section to="/login">Login</Section>
    </HeaderWrapper>
  );
};
