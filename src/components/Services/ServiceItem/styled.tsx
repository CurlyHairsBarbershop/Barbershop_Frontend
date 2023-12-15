import styled from 'styled-components';
import { Subtitle } from '../../common/Texts/Texts';
import { MainColor } from '../../../constants/colors';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  width: 100%;
`;

export const ServiceName = styled(Subtitle)`
  color: ${MainColor};
  font-size: 24px;

  @media (min-width: 469px) {
    font-size: 32px;
  }
`;
