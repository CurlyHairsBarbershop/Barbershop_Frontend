import React from 'react';
import { Container } from '../../components/common/Container/Container';
import { BarberCard } from '../../components/Barbers/BarberCard/BarberCard';
import { Barber } from '../../types/Barber/Barber';

const barber: Barber = {
  name: '123',
  description: '123',
  email: '134',
  image: '134',
  lastName: '134',
  phoneNumber: '134',
};

export const BarbersPage: React.FC = () => {
  return (
    <Container>
      <h1> Barbers page </h1>
      <BarberCard barber={barber} />
    </Container>
  );
};
