import dayjs from 'dayjs';
import { calculateTotalCost } from '../../../helpers/math';
import { FC, Fragment, useEffect } from 'react';
import { AppointsWrapper, TableTitle, Wrapper } from './styled';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { getCookie } from '../../../helpers/common';
import {
  cancelAppointment,
  getAppointmentsPerUser,
} from '../../../store/commercial/asyncThunks';
import { Button } from 'antd';

export const AppointmentTable: FC = () => {
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
      <AppointsWrapper>
        {appointments ? (
          <>
            <TableTitle>Status</TableTitle>
            <TableTitle>Date</TableTitle>
            <TableTitle>Client name</TableTitle>
            <TableTitle>Barber name</TableTitle>
            <TableTitle>Total cost</TableTitle>
            <TableTitle>Services</TableTitle>
            <TableTitle>Cancel Action</TableTitle>
            {appointments.map((appointment) => (
              <Fragment key={appointment.id}>
                <p>{!appointment.cancelled ? 'Active' : 'Canceled'}</p>
                <p>{dayjs(appointment.at).format('ddd DD, MM, YYYY')}</p>
                <p>{`${appointment.barber.name} ${appointment.barber.lastName}`}</p>
                <p>{`${appointment?.customer?.name} ${appointment?.customer?.lastName}`}</p>
                <p>{calculateTotalCost(appointment.favors)}</p>
                <p>
                  {appointment.favors.map((favor) => favor.name).join(', ')}
                </p>
                <Button
                  onClick={() =>
                    dispatch(cancelAppointment({ token, id: appointment.id }))
                  }
                >
                  Cancel
                </Button>
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
