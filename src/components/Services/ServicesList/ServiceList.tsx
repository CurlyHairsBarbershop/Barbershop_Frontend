import { ServiceItem } from '../ServiceItem/ServiceItem';
import { Wrapper } from './styled';

export const ServiceList = () => {
  return (
    <Wrapper>
      {Array.from({ length: 8 }).map((_, i) => (
        <ServiceItem key={i} />
      ))}
    </Wrapper>
  );
};
