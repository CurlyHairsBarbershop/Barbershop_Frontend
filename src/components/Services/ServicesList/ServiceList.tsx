import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { ServiceItem } from '../ServiceItem/ServiceItem';
import { Wrapper } from './styled';
import { getServices } from '../../../store/commercial/asyncThunks';

export const ServiceList = () => {
  const services = useAppSelector((state) => state.commercial.services);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, []);

  return (
    <Wrapper>
      {services.map((service) => (
        <ServiceItem service={service} key={service.id} />
      ))}
    </Wrapper>
  );
};
