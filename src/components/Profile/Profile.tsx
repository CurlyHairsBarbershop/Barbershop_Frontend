import { FC, Fragment, useEffect, useState } from 'react';
import {
  AccountField,
  AccountSetting,
  AccountSettings,
  AccountValue,
  AccountWrapper,
  AppointsWrapper,
  Wrapper,
} from './styled';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { TitleText } from '../common/Texts/Texts';
import {
  getAppointmentsPerUser,
  getFavouriteBarbers,
} from '../../store/commercial/asyncThunks';
import { getCookie } from '../../helpers/common';
import dayjs from 'dayjs';
import { calculateTotalCost } from '../../helpers/math';
import { Button } from 'antd';
import { ChangePasswordModal } from './ChangePasswordModal/ChangePasswordModal';
import { FavouriteBarbersList } from './FavouriteBarbers/FavoriteBarbersList';

export const Profile: FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const appointments = useAppSelector((state) => state.commercial.appointments);
  const favouriteBarbers = useAppSelector(
    (state) => state.commercial.favouriteBarbers,
  );
  const token = getCookie('token');
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

        <Button onClick={showModal}>Change password</Button>
      </AccountWrapper>
      {appointments.length && (
        <AppointsWrapper>
          {appointments ? (
            <>
              <p>Date</p>
              <p>Barber name</p>
              <p>Total cost</p>
              <p>Services</p>
              {appointments.map((appointment) => (
                <Fragment key={appointment.id}>
                  <p>{dayjs(appointment.at).format('ddd DD, MM, YYYY')}</p>
                  <p>{`${appointment.barber.name} ${appointment.barber.lastName}`}</p>
                  <p>{calculateTotalCost(appointment.favors)}</p>
                  <p>
                    {appointment.favors.map((favor) => favor.name).join(', ')}
                  </p>
                </Fragment>
              ))}
            </>
          ) : (
            <p>You do not have appointments</p>
          )}
        </AppointsWrapper>
      )}
      {favouriteBarbers.length && <FavouriteBarbersList barbers={favouriteBarbers} />}

      <ChangePasswordModal isOpen={isModalOpen} handleClose={closeModal} />
    </Wrapper>
  );
};
