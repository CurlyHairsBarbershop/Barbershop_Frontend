import React from 'react';
import { Container } from '../../components/common/Container/Container';
import { PageTitle } from '../../components/common/Texts/Texts';
import { AdminDashboard } from '../../components/AdminDashboard/AdminDashboard';

export const AdminDashboardPage: React.FC = () => {
  return (
    <Container>
      <PageTitle>Dashboard</PageTitle>
      <AdminDashboard />
    </Container>
  );
};
