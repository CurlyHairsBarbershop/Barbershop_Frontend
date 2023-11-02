import { FC } from 'react';
import { Wrapper } from './styled';
import { Subtitle } from '../../common/Texts/Texts';

type Props = {
  service: {
    name: string,
    price: string,
  }
}

export const ServiceItem: FC<Props> = ({service}) => {
  return (
    <Wrapper>
      <Subtitle>{service.name}</Subtitle>

      <Subtitle>{service.price}</Subtitle>
    </Wrapper>
  );
};
