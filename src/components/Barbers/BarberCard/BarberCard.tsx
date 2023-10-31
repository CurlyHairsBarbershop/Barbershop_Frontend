import { FC, useState } from 'react';
import { Barber } from '../../../types/Barber/Barber';
import {
  BarberData,
  BarberWrapper,
  InfoWrapper,
  BarberCardWrapper,
  BarberNameText,
} from './stlyled';
import { Col, Image } from 'antd';
import {
  SecondaryText,
  TitleText,
} from '../../common/Texts/Texts';
import { CloseButton } from '../../common/Buttons/Buttons';
import { CloseOutlined } from '@ant-design/icons';

type Props = {
  barber?: Barber;
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
        <BarberCardWrapper onClick={onOpen}>
          <BarberNameText>Lorem, ipsum dolor.</BarberNameText>
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
          <Image
            width={320}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <BarberData>
            <TitleText>{barber?.name}</TitleText>
            <SecondaryText>{barber?.description}</SecondaryText>
          </BarberData>
        </InfoWrapper>
      </BarberWrapper>
    </>
  );
};
