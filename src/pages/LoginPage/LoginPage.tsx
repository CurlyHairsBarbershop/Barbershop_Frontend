import { LoginForm } from '../../components/LoginForm/LoginForm';
import { AuthContainer } from '../../components/common/AuthContainer/AuthContainer';

export const LoginPage = () => {
  return (
    <AuthContainer>
      <LoginForm />
    </AuthContainer>
  );
};
