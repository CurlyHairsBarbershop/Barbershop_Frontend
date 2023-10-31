import React from 'react';
import { Container } from '../../components/common/Container/Container';
import { BarberList } from '../../components/Barbers/BarberList/BarberList';
import { PageTitle } from '../../components/common/Texts/Texts';

export const BarbersPage: React.FC = () => {
  return (
    <Container>
      <PageTitle> Barbers page </PageTitle>
      <BarberList />
    </Container>
  );
};
