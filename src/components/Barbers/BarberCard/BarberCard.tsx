import { FC, useState } from 'react';
import { Barber } from '../../../types/Barber/Barber';
import {
  BarberData,
  BarberWrapper,
  InfoWrapper,
  BarberCardWrapper,
  BarberNameText,
  BarberInfo,
  CommentWrapper,
} from './stlyled';
import { Col, Image } from 'antd';
import { SecondaryText, TitleText } from '../../common/Texts/Texts';
import { CloseButton } from '../../common/Buttons/Buttons';
import { CloseOutlined } from '@ant-design/icons';

type Props = {
  barber: Barber;
};

export const BarberCard: FC<Props> = ({ barber }) => {
  const [isBarberShown, setIsBarberShown] = useState(false);

  const onOpen = () => {
    setIsBarberShown(true);
  };

  const onClose = () => {
    setIsBarberShown(false);
  };

  return (
    <>
      <Col span={6}>
        <BarberCardWrapper
          bgimage={
            'https://gentlemensclub.com.ua/storage/barbers/October2023/N5PTEfNBm9Erz49spyzB.jpg'
          }
          onClick={onOpen}
        >
          <BarberNameText>{`${barber?.name} ${barber?.lastName}`}</BarberNameText>
        </BarberCardWrapper>
      </Col>
      <BarberWrapper
        open={isBarberShown}
        footer={null}
        closeIcon={false}
        centered={true}
      >
        <CloseButton onClick={onClose}>
          <CloseOutlined style={{ color: '#fff', fontSize: '24px' }} />
        </CloseButton>
        <InfoWrapper>
          <BarberInfo>
            <Image
              style={{ width: '100%', maxWidth: '320px', display: 'block' }}
              src={barber.imageUrl}
            />
            <BarberData>
              <TitleText>{barber?.name}</TitleText>
              <SecondaryText>{barber?.email}</SecondaryText>
              <SecondaryText>{barber?.phoneNumber}</SecondaryText>
              <SecondaryText>{barber?.description}</SecondaryText>
            </BarberData>
          </BarberInfo>
          <CommentWrapper title="Barber comments">
            
          </CommentWrapper>
        </InfoWrapper>
      </BarberWrapper>
    </>
  );
};
