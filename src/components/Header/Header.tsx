import {
  HeaderWrapper,
  Logo,
  SectionList,
  Section,
  SectionsWrapper,
} from './styled';

export const Header = () => {
  return (
    <HeaderWrapper>
      <SectionsWrapper>
        <Logo src="src/public/images/Header/logo.svg" preview={false} />
        <SectionList>
          <Section to="/">Home</Section>
          <Section to="/barbers">Barbers</Section>
          <Section to="/services">Services</Section>
          <Section to="/contacts">Contacts</Section>
          <Section to="/profile">Profile</Section>
        </SectionList>
      </SectionsWrapper>
      <Section to="/login">Login</Section>
    </HeaderWrapper>
  );
};
