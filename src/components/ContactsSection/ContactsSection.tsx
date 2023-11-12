import { FC } from 'react';
import { Container } from '../common/Container/Container';
import {
  Location,
  LocationWrapper,
  LogoImage,
  SideImage,
  SideTextWrapper,
  Wrapper,
} from './styled';
import { FrontText } from '../VideoBackground/styled';
import { Image } from 'antd';
import sideImg from '../../public/images/HomePage/sideImage.jpg';
import logo from '../../public/images/Header/logo.svg';

export const ContactsSection: FC = () => {
  return (
    <Container>
      <Wrapper>
        <SideTextWrapper>
          <FrontText>
            Luxury services and barbershop at your city
          </FrontText>

          <LocationWrapper>
            <Location>Kharkiv</Location>
            <Location>Ivano-Frankivsk</Location>
            <Location>Kyiv</Location>
          </LocationWrapper>
        </SideTextWrapper>

        <SideImage>
          <Image src={sideImg} />
          <LogoImage width={120} src={logo} />
        </SideImage>
      </Wrapper>
    </Container>
  );
};
