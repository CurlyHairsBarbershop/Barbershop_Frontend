import { FC } from 'react';
import { FrontText, VideoContainer, Wrapper } from './styled';
import { EnrollButton } from '../common/Buttons/Buttons';

type Props = {
  bgVideo: string;
  title?: string;
};

export const VideoBackground: FC<Props> = ({ bgVideo }) => {
  return (
    <VideoContainer>
      <video
        style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
        src={bgVideo}
        autoPlay
        loop
        muted
      />
      <Wrapper>
        <FrontText>
          Elevated barbering and stlying for all human kind.
        </FrontText>

        <EnrollButton>enroll now</EnrollButton>
      </Wrapper>
    </VideoContainer>
  );
};
