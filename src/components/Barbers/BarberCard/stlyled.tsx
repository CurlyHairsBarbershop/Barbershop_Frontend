import { Modal } from 'antd';
import styled from 'styled-components';
import { MainColor } from '../../../constants/colors';

export const BarberWrapper = styled(Modal)`
  max-width: 800px !important;
  width: 100% !important;
  
  position: relative;

  background-color: #fff;
  border-radius: 24px;
  border: 1px solid ${MainColor};

  .ant-modal-content {
    padding: 40px !important;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  gap: 36px;
`;

export const BarberData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;