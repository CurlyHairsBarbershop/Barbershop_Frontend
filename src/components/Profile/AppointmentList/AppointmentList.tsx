import dayjs from 'dayjs';
import { calculateTotalCost } from '../../../helpers/math';
import { FC, Fragment, useEffect } from 'react';
import { AppointsWrapper, TableTitle, Wrapper } from './styled';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { getCookie } from '../../../helpers/common';
import { getAppointmentsPerUser } from '../../../store/commercial/asyncThunks';
import { TitleText } from '../../common/Texts/Texts';

export const AppointmentList: FC = () => {
  const appointments = useAppSelector((state) => state.commercial.appointments);
  const token = getCookie('token') as string;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getAppointmentsPerUser(token));
    }
  }, []);

  return (
    <Wrapper>
      <TitleText style={{ marginBottom: '40px' }}>Your Appointments</TitleText>
      <AppointsWrapper>
        {appointments ? (
          <>
            <TableTitle>Date</TableTitle>
            <TableTitle>Barber name</TableTitle>
            <TableTitle>Total cost</TableTitle>
            <TableTitle>Services</TableTitle>
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
    </Wrapper>
  );
};
