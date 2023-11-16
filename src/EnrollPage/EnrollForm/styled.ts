import styled from 'styled-components';
import { DarkColor, WhiteColor } from '../../constants/colors';

export const AppointmentFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 20px;
  max-width: 800px;
  width: 100%;
  height: 700px;

  padding: 40px;
  background-color: ${WhiteColor};
  border-radius: 24px;
`;

export const EnrollButton = styled.button`
  margin-top: 40px;
  height: 40px;
  width: 120px;

  background-color: ${DarkColor};
  color: #fff;
  font-size: 18px;
  border-color: transparent;
  border-radius: 12px;

  transition: border-color 1s,  background-color 0.5s;
  
  &:hover {
    border: 1px solid #000 !important;
    color: #000 !important;
    background-color: rgba(170, 170, 170, 0.7);
  }
`;