import styled from 'styled-components';
import { WhiteColor } from '../../../constants/colors';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  width: 100%;
  margin-inline: auto;
  padding: 40px;
  margin-top: 40px;
  gap: 10px;

  background-color: ${WhiteColor};
  border-radius: 24px;
`;

export const Vector = styled.div`
  position: absolute;
  top: 7%;
  left: 3%;
`;

export const Logo = styled.div`
  position: absolute;
  right: -3%;
  top: -10%;

  transform: rotate(15deg);
`;

export const SecondVector = styled.div`
  position: absolute;
  bottom: 3%;
  right: 2%;
`;
