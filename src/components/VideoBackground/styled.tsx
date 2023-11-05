import styled from 'styled-components';
import { WhiteMainText } from '../common/Texts/Texts';

export const VideoContainer = styled.div`
  position: relative;
  margin-bottom: 80px;
`;

export const FrontText = styled(WhiteMainText)`
  width: 850px;
  `;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  position: absolute;
  bottom: 100px;
  left: 100px;
  right: 100px;
`;
