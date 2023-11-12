import { Image } from 'antd';
import styled from 'styled-components';
import { WhiteColor } from '../../constants/colors';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const SideImage = styled.div`
width: 400px;
position: relative;
`;

export const SideTextWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 300px;
`;

export const LogoImage = styled(Image)`
  position: absolute;
  bottom: 50px;
  left: -30px; 
  z-index: 10;

  transform: rotate(-24deg);

  border: 3px solid ${WhiteColor};
  border-radius: 100%;
`;

export const LocationWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;

  `;

export const Location = styled.p`
  padding: 12px;
  
  font-size: 20px;
  color: ${WhiteColor};
  border-right: 1px solid ${WhiteColor};
  
  &:last-child {
    border-right: 1px solid transparent;
  }
`;