import dayjs, { Dayjs } from 'dayjs';
import { AppointmentFormWrapper, EnrollButton } from './styled';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Select, TimePicker } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { getAccount } from '../../store/auth/asyncThunks';
import { getCookie } from '../../helpers/common';
import { Barber } from '../../types/Barber/Barber';
import { Service } from '../../types/Service/Service';
import {
  getSchedulePerBarber,
  getServices,
  makeAppointment,
} from '../../store/commercial/asyncThunks';
import { Appointment } from '../../types/Appointment/Appointment';

dayjs.extend(customParseFormat);

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return dayjs().isAfter(current);
};

const disabledHoursByDay = (dayToDisable: number, datesToDisable: Date[]) => {
  if (!dayToDisable) {
    return [];
  }
  console.log(dayToDisable);
  console.log('dates', datesToDisable);

  const currentDayToDisable = datesToDisable.filter(
    (d) => dayjs(d).date() === dayToDisable,
  );

  const hoursToDisable = [];

  for (const dateToDisable of currentDayToDisable) {
    const currentDate = dayjs(dateToDisable);

    if (currentDate.date() === dayToDisable) {
      hoursToDisable.push(currentDate.hour());
    }
  }

  return hoursToDisable;
};

export const EnrollForm = () => {
  const [appointment, setAppointment] = useState<Omit<Appointment, 'id'>>({
    at: new Date(),
    barberId: 0,
    serviceIds: [],
  });
  const [day, setDay] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hoursToDisable, setHoursToDisable] = useState<number[]>([]);
  const barbers: Barber[] = useAppSelector((state) => state.commercial.barbers);
  const services: Service[] = useAppSelector(
    (state) => state.commercial.services,
  );
  const barberSchedule = useAppSelector(
    (state) => state.commercial.schedulePerBarber,
  );
  const token = getCookie('token') as string;
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(getServices());
    dispatch(getAccount(token as string));

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSchedulePerBarber({ id: appointment.barberId, daysAhead: 2  }));
    setHoursToDisable(disabledHoursByDay(day, barberSchedule));
    console.log('schedule:', barberSchedule);
  }, [day, appointment.barberId, time]);

  const onSelectDate: DatePickerProps['onChange'] = (date) => {
    if (date !== null && date !== undefined) {
      setDay(dayjs(date).date());
    }
  };

  const onSelectTime = (time: Dayjs) => {
    setTime(time.hour());
    
    setAppointment((appointment) => {
      return {
        ...appointment,
        at: dayjs()
          .set('date', day)
          .set('hour', time.hour())
          .set('minute', 0)
          .set('second', 0)
          .set('millisecond', 0)
          .format('YYYY-MM-DDTHH:mm:ss'),
      };
    });
  };

  const onSelectBarber = (value: number) => {
    setAppointment((appointment) => {
      return { ...appointment, barberId: value };
    });
  };

  const onSelectServices = (values: number[]) => {
    setAppointment((appointment) => {
      return { ...appointment, serviceIds: [...values] };
    });
  };

  const onSubmit = () => {
    dispatch(makeAppointment({ appointment, token }));
  };

  return (
    <>
      {isLoading && <h1>loading</h1>}
      {isAuth && !isLoading ? (
        <AppointmentFormWrapper>
          <Select
            placeholder="Select a barber"
            style={{ width: '300px' }}
            options={barbers.map((barber) => ({
              value: barber.id,
              label: `${barber.name} ${barber.lastName}`,
            }))}
            onChange={onSelectBarber}
          />
          <DatePicker
            disabledDate={disabledDate}
            disabledHours={() => hoursToDisable}
            onChange={onSelectDate}
            style={{ width: '300px' }}
          />
          <TimePicker
            style={{ width: '300px' }}
            onChange={onSelectTime}
            disabledHours={() => hoursToDisable}
            format="HH"
          />
          <Select
            mode="multiple"
            allowClear
            placeholder="Select a service"
            style={{ width: '300px' }}
            options={services.map((service) => ({
              value: service.id,
              label: `${service.name}`,
            }))}
            onChange={onSelectServices}
          />
          <EnrollButton onClick={onSubmit}>To Enroll</EnrollButton>
        </AppointmentFormWrapper>
      ) : (
        !isLoading && <h1>You must be registered</h1>
      )}
    </>
  );
};
