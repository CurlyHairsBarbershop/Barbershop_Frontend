import { FC, useEffect } from 'react';
import { Image, Input, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import {
  getAccount,
  signIn,
  signInAdminAccount,
} from '../../store/auth/asyncThunks';
import { Form, LoginFormWrapper, Wrapper } from './styled';
import { PageTitle, WhiteSecondaryText } from '../common/Texts/Texts';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import logo from '../../public/images/Header/logo.svg';
import { SubmitButton } from '../common/Buttons/Buttons';
import { AuthRedirectLink } from '../common/Links/Links';
import { getCookie } from '../../helpers/common';

interface LoginModel {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email().required('Please enter email!'),
    password: yup
      .string()
      .min(6, 'Password min length is 5 symbols.')
      .required('Please enter the password'),
  })
  .required();

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<LoginModel>({
    resolver: yupResolver(schema),
  });
  const error = useAppSelector((state) => state.auth.errorMessage);
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

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: 'You have been logged in succesfully',
      description:
        'Congratulations! Now you can enroll for a haircut of your dream!',
      placement,
    });
  };

  const onSubmit: SubmitHandler<LoginModel> = async (data) => {
    const response = await dispatch(signIn(data));
    const adminResponse = await dispatch(signInAdminAccount(data));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!response?.error || !adminResponse.error) {
      await openNotification('bottomRight');
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
          <PageTitle style={{ color: '#000' }}>Log in</PageTitle>
          <LoginFormWrapper>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  {error && <p>{error?.message}</p>}
                  <Input placeholder="Email" {...field} />
                </>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password placeholder="Password" {...field} />
              )}
            />
            <SubmitButton type="submit">Log in</SubmitButton>
          </LoginFormWrapper>
          <WhiteSecondaryText>{error}</WhiteSecondaryText>

          <AuthRedirectLink to="/signup">Create account</AuthRedirectLink>
        </Form>
      </Wrapper>
    </>
  );
};
