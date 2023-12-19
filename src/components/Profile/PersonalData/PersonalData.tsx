import { useEffect, useState } from 'react';
import {
  getAppointmentsPerUser,
  getFavouriteBarbers,
} from '../../../store/commercial/asyncThunks';
import { TitleText } from '../../common/Texts/Texts';
import {
  AccountField,
  AccountSetting,
  AccountSettings,
  AccountValue,
  AccountWrapper,
  Wrapper,
} from './styled';
import { getCookie } from '../../../helpers/common';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { Button } from 'antd';
import { ChangePasswordModal } from '../ChangePasswordModal/ChangePasswordModal';

export const PersonalData = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const token = getCookie('token') as string;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getAppointmentsPerUser(token));
      dispatch(getFavouriteBarbers(token));
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <AccountWrapper>
        <TitleText style={{ marginBottom: '40px' }}>Your Profile</TitleText>
        <AccountSettings>
          <AccountSetting>
            <AccountField>Name:</AccountField>
            <AccountValue>{user?.name}</AccountValue>
          </AccountSetting>

          <AccountSetting>
            <AccountField>Lastname:</AccountField>
            <AccountValue>{user?.lastName}</AccountValue>
          </AccountSetting>

          <AccountSetting>
            <AccountField>Email:</AccountField>
            <AccountValue>{user?.email}</AccountValue>
          </AccountSetting>

          {user?.phoneNumber && (
            <AccountSetting>
              <AccountField>Phone:</AccountField>
              <AccountValue>{user?.phoneNumber}</AccountValue>
            </AccountSetting>
          )}

          <AccountSetting>
            <AccountField>Password:</AccountField>
            <AccountValue>*********</AccountValue>
          </AccountSetting>
        </AccountSettings>
        <Button style={{marginTop: '20px'}} onClick={showModal}>Change password</Button>
      </AccountWrapper>

      <ChangePasswordModal isOpen={isModalOpen} handleClose={closeModal} />
    </Wrapper>
  );
};
