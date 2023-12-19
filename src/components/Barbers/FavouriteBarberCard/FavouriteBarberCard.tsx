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
  
  function base64toBlob(base64: string, contentType: string = 'image/jpeg') {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: contentType });
  }

  
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
            URL.createObjectURL(base64toBlob(barber.ImageUrl))
          }
        >
          <BarberNameText>{`${barber?.Name} ${barber?.LastName}`}</BarberNameText>
        </FavouriteBarberCardWrapper>
      </Wrapper>
    </Col>
  );
};
