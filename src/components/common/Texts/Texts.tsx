import styled from 'styled-components';
import { WhiteColor } from '../../../constants/colors';

export const WhiteMainText = styled.p`
  font-size: 68px;
  font-weight: 500;
  color: ${WhiteColor};
`;

export const TitleText = styled.p`
  font-size: 32px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const WhiteTitleText = styled(TitleText)`
  color: ${WhiteColor};
`;

export const SecondaryText = styled.p`
  font-size: 18px;
  font-weight: 400;

    @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const WhiteSecondaryText = styled.p`
  color: ${WhiteColor};
`;

export const PageTitle = styled.p`
  color: ${WhiteColor};
  font-size: 40px;
  font-weight: 700;

  margin-bottom: 20px;
`;

export const Subtitle = styled.p`
  font-size: 32px;
  font-weight: 700;
  color: ${WhiteColor};
`;
