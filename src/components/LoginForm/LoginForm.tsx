import { FC } from 'react';
import { Input, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { signIn } from '../../store/auth/asyncThunks';
import { LoginFormWrapper, Wrapper } from './styled';
import { PageTitle, WhiteSecondaryText } from '../common/Texts/Texts';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
  const error = useAppSelector(state => state.auth.errorMessage);
  
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
    
    await openNotification('bottomRight');
    
    if (!response?.error) {
      setTimeout(() => {
        navigate('/home');
      }, 2500);
    }
  };

  return (
    <>
      {contextHolder}
      <Wrapper>
        <PageTitle>Log in</PageTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit">Log in</button>
          </LoginFormWrapper>
        </form>
        <WhiteSecondaryText>{error}</WhiteSecondaryText>
      </Wrapper>
    </>
  );
};
