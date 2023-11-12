import { Carousel } from 'antd';
import { FC } from 'react';
import { Slide, SlideImage } from './styled';

const props = {
  autoplay: true,
  dots: false,
  infinite: true,
  autoplaySpeed: 2000,
  speed: 2000,
  slidesToShow: 2,
  slidesToScroll: 1,
  centerMode: true,
};

export const MainSlider: FC = () => {
  return (
    <Carousel {...props}>
      <Slide>
        <SlideImage
          preview={false}
          src="src/public/images/HomePage/slide2.jpg"
        />
      </Slide>
      <Slide>
        <SlideImage
          preview={false}
          src="src/public/images/HomePage/slide1.jpg"
        />
      </Slide>
      <Slide>
        <SlideImage
          preview={false}
          src="src/public/images/HomePage/slide3.jpg"
        />
      </Slide>
      <Slide>
        <SlideImage
          preview={false}
          src="src/public/images/HomePage/slide4.jpg"
        />
      </Slide>
    </Carousel>
  );
};
