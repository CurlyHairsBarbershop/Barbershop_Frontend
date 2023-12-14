import { Image, Modal } from 'antd';
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

  font-size: 21px;
  font-weight: 700;
  color: ${WhiteColor};
`;

export const BarberWrapper = styled(Modal)`
  display: flex;
  max-width: 800px !important;
  width: 100% !important;

  position: relative;

  background-color: #fff;
  border-radius: 24px;
  border: 1px solid ${MainColor};

  .ant-modal-content {
    padding: 40px !important;
  }

  @media (max-width: 768px) {
    max-width: 400px !important;

    .ant-modal-content {
      padding: 20px !important;
    }
  }

  @media (max-width: 468px) {
    max-width: 300px !important;
  }
`;

export const BarberImageContainer = styled.div`
display: flex;
  width: 100%;
  /* max-width: 260px !important; */
  /* max-height: 240px !important; */
  justify-content: center;

  @media (min-width: 769px) {
    max-width: 240px !important;
    justify-content: unset;
  }
`;

export const BarberImage = styled(Image)`
  width: 100%;
  max-width: 240px !important;
  /* max-height: 240px !important; */
  display: 'block' !important;

  @media (min-width: 769px) {
    max-width: 280px !important;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 769px) {
    flex-direction: row;
  }
`;

export const BarberInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 100%;
`;

export const BarberData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ReviewWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 230px;

  overflow-y: scroll;
  background-color: ${WhiteColor};
`;

export const ReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  margin-bottom: 16px;
  padding: 8px;
  padding-top: unset;
`;

export const ReviewFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LikeWrapper = styled.div`
  position: absolute;
  right: 10%;
  top: 5%;
  width: 24px;
  height: 24px;
  z-index: 10;
`;

interface ILikeIcon {
  isFilled: boolean;
}

export const LikeIcon = styled(HeartFilled)<ILikeIcon>`
  font-size: 24px;
  color: ${(props) => (props.isFilled ? '#f842b2e2' : '#000')};
  transition: color 0.3s;

  &:hover {
    color: #f842b2e2;
  }
`;

export const EditBarberWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Reviews = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  gap: 16px;
`;
