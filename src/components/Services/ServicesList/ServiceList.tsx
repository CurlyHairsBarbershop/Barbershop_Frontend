import { ServiceItem } from '../ServiceItem/ServiceItem';
import { Wrapper } from './styled';

const service = {
  name: 'Service',
  price: '$100',
};

export const ServiceList = () => {
  return (
    <Wrapper>
      {Array.from({ length: 8 }).map((_, i) => (
        <ServiceItem service={service} key={i} />
      ))}
    </Wrapper>
  );
};
