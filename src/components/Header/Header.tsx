import { Image } from 'antd';
import { deleteCookie, getCookie } from '../../helpers/common';
import { actions } from '../../store/auth/slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import {
  HeaderWrapper,
  Logo,
  SectionList,
  Section,
  SectionsWrapper,
  SectionText,
  SectionLogout,
  MenuIcon,
  MenuWrapper,
  MobileHeaderActions,
} from './styled';
import { useSpring } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAccount } from '../../store/auth/asyncThunks';

export const Header = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = getCookie('token');

  useEffect(() => {
    if (token) {
      dispatch(getAccount(token as string));
    }
  }, []);

  const [springs, api] = useSpring(() => ({
    from: { x: '-100%' },
  }));

  const handleClick = () => {
    api.start({ from: { x: '-100%' }, to: { x: '0' } });
  };

  const handleClose = () => {
    api.start({ from: { x: '0' }, to: { x: '-100%' } });
  };

  const onLogOut = () => {
    deleteCookie('token');
    dispatch(actions.setAuth(false));
    navigate('/home');
  };

  return (
    <>
      <HeaderWrapper>
        <SectionsWrapper>
          <Logo src="src/public/images/Header/logo.svg" preview={false} />
          <SectionList>
            <Section to="/">Home</Section>
            <Section to="/barbers">Barbers</Section>
            <Section to="/services">Services</Section>
            {isAuth && <Section to="/profile">Profile</Section>}
            {user?.email === 'admin@gmail.com' && (
              <Section to="/dashboard">Dashboard</Section>
            )}
          </SectionList>
          <MenuIcon onClick={handleClick}>
            <Image src="src/public/images/Header/menu.svg" preview={false} />
          </MenuIcon>
        </SectionsWrapper>
        {!isAuth ? (
          <SectionLogout to="/login">Log In</SectionLogout>
        ) : (
          <SectionText onClick={onLogOut}>Log Out</SectionText>
        )}
      </HeaderWrapper>

      <MenuWrapper style={{ ...springs }}>
        <MobileHeaderActions>
          <MenuIcon style={{ marginBottom: '20px' }}>
            <Image
              onClick={handleClose}
              src="src/public/images/Header/close.svg"
              preview={false}
            />
          </MenuIcon>
          <Logo src="src/public/images/Header/logo.svg" preview={false} />
        </MobileHeaderActions>
        <Section onClick={handleClose} to="/">
          Home
        </Section>

        <Section onClick={handleClose} to="/barbers">
          Barbers
        </Section>

        <Section onClick={handleClose} to="/services">
          Services
        </Section>

        {isAuth && (
          <Section onClick={handleClose} to="/profile">
            Profile
          </Section>
        )}

        {user?.email === 'admin@gmail.com' && (
          <Section onClick={handleClose} to="/dashboard">
            Dashboard
          </Section>
        )}
      </MenuWrapper>
    </>
  );
};
