import { FC } from 'react';
import {
  AccountField,
  AccountSetting,
  AccountSettings,
  AccountValue,
  AccountWrapper,
  AppointsWrapper,
  Wrapper,
} from './styled';
import { getCookie } from '../../helpers/common';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { TitleText } from '../common/Texts/Texts';

export const Profile: FC = () => {
  const token = getCookie('token');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);

  return (
    <Wrapper>
      <AccountWrapper>
        <TitleText>Your Profile</TitleText>
        <AccountSettings>
          <AccountSetting>
            <AccountField>Name</AccountField>
            <AccountValue>{user?.name}</AccountValue>
          </AccountSetting>
          
          <AccountSetting>
            <AccountField>Lastname</AccountField>
            <AccountValue>{user?.lastName}</AccountValue>
          </AccountSetting>
          
          <AccountSetting>
            <AccountField>Email</AccountField>
            <AccountValue>{user?.email}</AccountValue>
          </AccountSetting>
          
          <AccountSetting>
            <AccountField>Phone</AccountField>
            <AccountValue>{user?.phone || '-'}</AccountValue>
          </AccountSetting>
        </AccountSettings>
      </AccountWrapper>
      <AppointsWrapper>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
  
      </AppointsWrapper>
    </Wrapper>
  );
};
