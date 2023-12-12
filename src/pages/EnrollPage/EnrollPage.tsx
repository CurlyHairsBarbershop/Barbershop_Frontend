import { EnrollForm } from '../../components/EnrollForm/EnrollForm';
import { Container } from '../../components/common/Container/Container';
import { PageTitle } from '../../components/common/Texts/Texts';
import { Wrapper } from './styled';

export const EnrollPage = () => {
  return (
    <Container>
      <PageTitle> Enroll </PageTitle>
      <Wrapper>
        <EnrollForm />
      </Wrapper>
    </Container>
  );
};