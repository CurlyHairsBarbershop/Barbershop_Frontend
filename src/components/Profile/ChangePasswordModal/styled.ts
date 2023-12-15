import styled from 'styled-components';
import { SubmitButton } from '../../common/Buttons/Buttons';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`;

export const Button = styled(SubmitButton)`
  font-size: 14px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;