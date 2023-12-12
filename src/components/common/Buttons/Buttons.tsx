import { Button } from 'antd';
import styled from 'styled-components';
import { MainColor } from '../../../constants/colors';

export const CloseButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: -20px;
  right: -30px;

  width: 60px;
  height: 60px;

  border: none;
  background-color: ${MainColor};
`;

export const EnrollButton = styled(Button)`
  width: 180px;
  height: 60px;
  padding: 12px 16px;

  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 18px;
  text-transform: uppercase;
  border-color: transparent;

  transition:
    border-color 1s,
    background-color 0.5s;

  &:hover {
    border: 1px solid transparent !important;
    color: #fff !important;
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 150px;
  height: 40px;
  padding: 12px 16px;

  background-color: ${MainColor};
  color: #fff;
  font-size: 18px;
  text-transform: uppercase;
  border-color: transparent;
  border-radius: 12px;

  transition:
    border-color 1s,
    background-color 0.5s;

  &:hover {
    border: 1px solid transparent !important;
    background-color: rgba(48, 78, 144, 0.8);
  }
`;
