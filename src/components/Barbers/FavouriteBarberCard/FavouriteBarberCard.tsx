import { FC } from 'react';
import { UpperBarber } from '../../../types/Barber/Barber';
import {
  BarberNameText,
  FavouriteBarberCardWrapper,
  Wrapper,
} from '../BarberCard/stlyled';
import { Col } from 'antd';

type Props = {
  barber: UpperBarber;
};

export const FavouriteBarberCard: FC<Props> = ({ barber }) => {
  return (
    <Col
      xl={{ span: 6 }}
      lg={{ span: 8 }}
      md={{ span: 12 }}
      sm={{ span: 24 }}
      xs={{ span: 24 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Wrapper>
        <FavouriteBarberCardWrapper
          bgimage={
            'https://gentlemensclub.com.ua/storage/barbers/October2023/N5PTEfNBm9Erz49spyzB.jpg'
          }
        >
          <BarberNameText>{`${barber?.Name} ${barber?.LastName}`}</BarberNameText>
        </FavouriteBarberCardWrapper>
      </Wrapper>
    </Col>
  );
};
