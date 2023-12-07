import { FC } from 'react';
import { Wrapper } from './styled';
import { Subtitle } from '../../common/Texts/Texts';
import { Service } from '../../../types/Service/Service';

type Props = {
  service: Service;
};

export const ServiceItem: FC<Props> = ({ service }) => {
  return (
    <Wrapper>
      <Subtitle>{service.name}</Subtitle>

      <Subtitle>{service.cost}</Subtitle>
    </Wrapper>
  );
};
