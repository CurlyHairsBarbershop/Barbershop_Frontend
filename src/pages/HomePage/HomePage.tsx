import React from 'react';
// import { getCookie } from '../../helpers/common';
// import { Button } from 'antd';
import { Container } from '../../components/common/Container/Container';
import { MainSlider } from '../../components/Slider/MainSlider';
import bgVideo from '../../public/videos/HomePage/bgVideo2.mp4';
import { VideoBackground } from '../../components/VideoBackground/VideoBackground';
import { WhiteTitleText } from '../../components/common/Texts/Texts';
import { ContactsSection } from '../../components/ContactsSection/ContactsSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <VideoBackground bgVideo={bgVideo} />
      <Container>
        <WhiteTitleText>
          A Fresh Take on Barbering & Hairdressing
        </WhiteTitleText>
      </Container>
      <MainSlider />
      <ContactsSection />
    </>
  );
};
