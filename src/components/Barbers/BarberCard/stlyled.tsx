import { Modal } from 'antd';
import styled from 'styled-components';
import { MainColor, WhiteColor } from '../../../constants/colors';
import { Card } from 'antd';

export const BarberCardWrapper = styled(Card)`
  position: relative;

  max-width: 300px;
  width: 100%;
  height: 300px;

  background-image: url('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png');
  background-size: cover;
  transition: transform 500ms;

  &:hover {
    transform: scale(1.05);
  }
`;

export const BarberNameText = styled.p`
  position: absolute;
  right: 8px;
  bottom: 8px;

  font-size: 28px;
  font-weight: 700;
  color: ${WhiteColor};
`;

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
