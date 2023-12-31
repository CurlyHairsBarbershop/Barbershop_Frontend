import React from 'react';
import { Container } from '../../components/common/Container/Container';
import { MainSlider } from '../../components/Slider/MainSlider';
import bgVideo from '../../public/videos/HomePage/bgVideo2.mp4';
import { VideoBackground } from '../../components/VideoBackground/VideoBackground';
import { WhiteTitleText } from '../../components/common/Texts/Texts';
import { ContactsSection } from '../../components/ContactsSection/ContactsSection';
import { Wrapper } from '../../components/common/Container/styled';

export const HomePage: React.FC = () => {
  return (
    <>
      <VideoBackground bgVideo={bgVideo} />
      <Wrapper style={{minHeight: 'unset'}}>
        <WhiteTitleText>
          A Fresh Take on Barbering & Hairdressing
        </WhiteTitleText>
      </Wrapper>
      <MainSlider />
      <Container>
        <ContactsSection />
      </Container>
    </>
  );
};
