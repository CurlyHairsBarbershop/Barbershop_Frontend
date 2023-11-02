import { FC, useState } from 'react';
import { Button, Input, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { useAppDispatch } from '../../store/hooks/hooks';
import { signUp } from '../../store/auth/asyncThunks';
import { RegisterFormWrapper, Wrapper } from './styled';
import { PageTitle } from '../common/Texts/Texts';
import { useNavigate } from 'react-router-dom';

interface RegisterModel {
  email: string;
  name: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm: FC = () => {
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState<RegisterModel>({
    email: '',
    name: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: 'You have been singed up succesfully',
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
    await dispatch(signUp(newUser));
    await openNotification('bottomRight');

    setTimeout(() => {
      navigate('/home');
    }, 2500);
  };

  return (
    <>
      {contextHolder}
      <Wrapper>
        <PageTitle>Sign Up</PageTitle>
        <RegisterFormWrapper>
          <Input
            placeholder="Email"
            value={newUser.email}
            onChange={(event) => handleFieldChange('email', event)}
          />
          <Input
            placeholder="Name"
            value={newUser.name}
            onChange={(event) => handleFieldChange('name', event)}
          />
          <Input
            placeholder="Last name"
            value={newUser.lastName}
            onChange={(event) => handleFieldChange('lastName', event)}
          />
          <Input
            placeholder="Password"
            value={newUser.password}
            onChange={(event) => handleFieldChange('password', event)}
          />
          <Input
            placeholder="Confirm password"
            value={newUser.confirmPassword}
            onChange={(event) => handleFieldChange('confirmPassword', event)}
          />
          <Button onClick={onSubmit}>Sign Up</Button>
        </RegisterFormWrapper>
      </Wrapper>
    </>
  );
};
