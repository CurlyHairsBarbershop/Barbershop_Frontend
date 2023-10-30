import { Button } from 'antd';
import styled from 'styled-components';
import { SecondaryColor } from '../../../constants/colors';

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
  background-color: ${SecondaryColor};
`;
