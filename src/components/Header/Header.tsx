import { deleteCookie } from '../../helpers/common';
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
} from './styled';

export const Header = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  const onLogOut = () => {
    deleteCookie('token');
    dispatch(actions.setAuth(false));
  };

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
      {!isAuth ? (
        <SectionLogout to="/login">Log In</SectionLogout>
      ) : (
        <SectionText onClick={onLogOut}>Log Out</SectionText>
      )}
    </HeaderWrapper>
  );
};
