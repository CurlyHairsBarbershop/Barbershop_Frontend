import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { AuthContainer } from '../../components/common/AuthContainer/AuthContainer';

export const SignUpPage = () => {
  return (
    <AuthContainer>
      <RegisterForm />;
    </AuthContainer>
  );
};
