import styled from 'styled-components';
import { DarkColor } from '../../constants/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const RegisterFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-width: 400px;
  padding: 40px;

  border-radius: 24px;
  border: 1px solid ${DarkColor};
`;
