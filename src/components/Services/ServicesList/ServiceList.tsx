import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { ServiceItem } from '../ServiceItem/ServiceItem';
import { Logo, Wrapper } from './styled';
import { getServices } from '../../../store/commercial/asyncThunks';
import { Image } from 'antd';
import logo from '../../../public/images/Header/logo.svg';

export const ServiceList = () => {
  const services = useAppSelector((state) => state.commercial.services);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, []);

  return (
    <Wrapper>
      <Logo>
        <Image src={logo} alt="logo" height={80} preview={false} />
      </Logo>

      {services?.map((service) => (
        <ServiceItem service={service} key={service.id} />
      ))}
    </Wrapper>
  );
};
