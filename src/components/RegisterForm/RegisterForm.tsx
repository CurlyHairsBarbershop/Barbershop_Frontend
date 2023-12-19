import { FC, useEffect } from 'react';
import { Image, Input, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { getAccount, signUp } from '../../store/auth/asyncThunks';
import { Form, RegisterFormWrapper, Wrapper } from './styled';
import { PageTitle } from '../common/Texts/Texts';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import logo from '../../public/images/Header/logo.svg';
import { SubmitButton } from '../common/Buttons/Buttons';
import { AuthRedirectLink } from '../common/Links/Links';
import { getCookie } from '../../helpers/common';

interface RegisterModel {
  email: string;
  name: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    email: yup.string().email().required('Please enter email!'),
    name: yup.string().required('Please enter your name!'),
    lastName: yup.string().required('Please enter your last name.'),
    password: yup
      .string()
      .min(6, 'Password min length is 6 symbols.')
      .required('Please enter the password'),
    confirmPassword: yup
      .string()
      .min(6, 'Password min length is 6 symbols.')
      .required('Please enter the password'),
  })
  .required();

export const RegisterForm: FC = () => {
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<RegisterModel>({
    resolver: yupResolver(schema),
  });

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const token = getCookie('token') as string;

  useEffect(() => {
    dispatch(getAccount(token));
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth]);

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: 'You have been singed up succesfully',
      description:
        'Congratulations! Now you can enroll for a haircut of your dream!',
      placement,
    });
  };

  const onSubmit: SubmitHandler<RegisterModel> = async (data) => {
    const response = await dispatch(signUp(data));
    await openNotification('bottomRight');

    if (!response?.payload?.response?.data) {
      setTimeout(() => {
        navigate('/home');
      }, 2500);
    }
  };

  return (
    <>
      {contextHolder}
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Image width={80} src={logo} preview={false} />
          <PageTitle style={{ color: '#000' }}>Sign Up</PageTitle>
          <RegisterFormWrapper>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input placeholder="Email" {...field} />}
            />

            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input placeholder="Name" {...field} />}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input placeholder="Last Name" {...field} />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password placeholder="Password" {...field} />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password placeholder="Confirm password" {...field} />
              )}
            />

            <SubmitButton type="submit">Sign Up</SubmitButton>
          </RegisterFormWrapper>
          <AuthRedirectLink to="/login">Already have account? Log in.</AuthRedirectLink>
        </Form>
      </Wrapper>
    </>
  );
};
