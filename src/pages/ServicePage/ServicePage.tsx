import { ServiceList } from '../../components/Services/ServicesList/ServiceList';
import { Container } from '../../components/common/Container/Container';
import { PageTitle } from '../../components/common/Texts/Texts';

export const ServicePage: React.FC = () => {
  return (
    <Container>
      <PageTitle> Service page </PageTitle>
      <ServiceList />
    </Container>
  );
};
