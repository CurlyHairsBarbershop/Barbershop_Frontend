import { FC, useState } from 'react';
import { Button, Input, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { useAppDispatch } from '../../store/hooks/hooks';
import { signIn } from '../../store/auth/asyncThunks';
import { LoginFormWrapper, Wrapper } from './styled';
import { PageTitle } from '../common/Texts/Texts';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../store/auth/slice';

interface LoginModel {
  email: string;
  password: string;
}

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState<LoginModel>({
    email: '',
    password: '',
  });

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: 'You have been logged in succesfully',
      description:
        'Congratulations! Now you can enroll for a haircut of your dream!',
      placement,
    });
  };

  const handleFieldChange = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log(newUser);
    setNewUser((prevUser) => {
      return {
        ...prevUser,
        [fieldName]: event.target.value,
      };
    });
  };

  const onSubmit = async () => {
    await dispatch(signIn(newUser));
    await dispatch(actions.setAuth(true));
    await openNotification('bottomRight');

    setTimeout(() => {
      navigate('/home');
    }, 2500);
  };

  return (
    <>
      {contextHolder}
      <Wrapper>
        <PageTitle>Log in</PageTitle>
        <LoginFormWrapper>
          <Input
            placeholder="Email"
            value={newUser.email}
            onChange={(event) => handleFieldChange('email', event)}
          />
          <Input
            placeholder="Password"
            value={newUser.password}
            onChange={(event) => handleFieldChange('password', event)}
          />
          <Button onClick={onSubmit}>Log in</Button>
        </LoginFormWrapper>
      </Wrapper>
    </>
  );
};
