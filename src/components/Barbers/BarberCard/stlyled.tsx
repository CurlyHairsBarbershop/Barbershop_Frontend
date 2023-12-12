import { Modal } from 'antd';
import styled from 'styled-components';
import { MainColor, WhiteColor } from '../../../constants/colors';
import { Card } from 'antd';
import { HeartFilled } from '@ant-design/icons';

interface BarberCardWrapperProps {
  bgimage: string;
}

export const BarberCardWrapper = styled(Card)<BarberCardWrapperProps>`
  position: relative;
  max-width: 280px;
  width: 100%;
  height: 300px;
  background-size: cover;
  transition: transform 500ms;
  background-image: ${(props) => `url(${props.bgimage})`};
  background-position: center;

  &:hover {
    transform: scale(1.05);
  }
`;

export const BarberNameText = styled.p`
  position: absolute;
  right: 8px;
  bottom: 8px;

  font-size: 24px;
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
  flex-direction: column;
  gap: 36px;
`;

export const BarberInfo = styled.div`
  display: flex;
  gap: 36px;
`;

export const BarberData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ReviewWrapper = styled(Card)`
  width: 100%;
  max-height: 400px;
  overflow-y: scroll;
  background-color: ${WhiteColor};
`;

export const ReviewCard = styled.div`
  width: 100%;
`;

export const ReviewFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LikeWrapper = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
`;

interface ILikeIcon {
  isFilled: boolean;
}

export const LikeIcon = styled(HeartFilled)<ILikeIcon>`
  font-size: 24px;
  color: ${(props) => props.isFilled ? '#f842b2e2' : '#000'};
  transition: color 0.3s;

  &:hover {
    color: #f842b2e2;
  }
  
`;

export const EditBarberWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
