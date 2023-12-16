import { FC } from 'react';
import { ServiceName, Wrapper } from './styled';
import { Service } from '../../../types/Service/Service';

type Props = {
  service: Service;
};

export const ServiceItem: FC<Props> = ({ service }) => {
  return (
    <Wrapper>
      <ServiceName>{service.name}</ServiceName>

      <ServiceName>{service.cost}</ServiceName>
    </Wrapper>
  );
};
