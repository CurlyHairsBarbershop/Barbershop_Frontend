import { FC } from 'react';
import { Input, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { useAppDispatch } from '../../store/hooks/hooks';
import { signUp } from '../../store/auth/asyncThunks';
import { RegisterFormWrapper, Wrapper } from './styled';
import { PageTitle } from '../common/Texts/Texts';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
        <PageTitle>Sign Up</PageTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <Input placeholder="Password" {...field} />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input placeholder="Confirm password" {...field} />
              )}
            />

            <button type="submit">Sign Up</button>
          </RegisterFormWrapper>
        </form>
      </Wrapper>
    </>
  );
};
