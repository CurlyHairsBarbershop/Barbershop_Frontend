import { ServiceList } from '../../components/Services/ServicesList/ServiceList';
import { Container } from '../../components/common/Container/Container';
import { PageTitle } from '../../components/common/Texts/Texts';
import { getCookie } from '../../helpers/common';

export const ServicePage: React.FC = () => {
  console.log(getCookie('tokens'));
  return (
    <Container>
      <PageTitle> Service page </PageTitle>
      <ServiceList />
    </Container>
  );
};
