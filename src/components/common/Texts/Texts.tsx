import styled from 'styled-components';
import { WhiteColor } from '../../../constants/colors';

export const TitleText = styled.p`
  font-size: 36px;
  font-weight: 700;
`;

export const WhiteTitleText = styled(TitleText)`
  color: ${WhiteColor};
`;

export const SecondaryText = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

export const WhiteSecondaryText = styled.p`
  color: ${WhiteColor}
`;

export const PageTitle = styled.p`
  font-size: 40px;
  font-weight: 700;

  margin-bottom: 20px;
`;