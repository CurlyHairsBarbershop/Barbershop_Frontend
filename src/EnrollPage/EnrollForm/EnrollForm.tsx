import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Select } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { getAccount } from '../../store/auth/asyncThunks';
import { getCookie } from '../../helpers/common';
import { Barber } from '../../types/Barber/Barber';
import { Service } from '../../types/Service/Service';
import {
  getServices,
  makeAppointment,
} from '../../store/commercial/asyncThunks';
import { Appointment } from '../../types/Appointment/Appointment';

dayjs.extend(customParseFormat);

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current < dayjs().endOf('day');
};

// interface EnrollModel {
//   at: Date;
//   barberId: number;
//   serviceIds: number[];
// }

// const schema = yup
//   .object({
//     at: yup.date().required('Choose a date'),
//     barberId: yup.number().required('Choose a barber'),
//     serviceIds: yup.array().of(yup.number()).required('Choose service(-s)'),
//   })
//   .required();

const dateFormat = 'YYYY/MM/DD HH';

export const EnrollForm = () => {
  const navigate = useNavigate();
  // const { handleSubmit, control } = useForm<EnrollModel>({
  //   resolver: yupResolver(schema),
  // });
  const [appointment, setAppointment] = useState<Omit<Appointment, 'id'>>({
    at: new Date(),
    barberId: 0,
    serviceIds: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const barbers: Barber[] = useAppSelector((state) => state.commercial.barbers);
  const services: Service[] = useAppSelector(
    (state) => state.commercial.services,
  );
  const token = getCookie('token') as string;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServices());
    dispatch(getAccount(token as string));

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [dispatch]);

  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const onSelectDate: DatePickerProps['onChange'] = (date) => {
    if (date !== null && date !== undefined) {
      setAppointment((appointment) => {
        return { ...appointment, at: dayjs(date).toDate() };
      });
    }
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

  useEffect(() => {
    console.log(appointment);
  }, [appointment]);

  const onSubmit = () => {
    dispatch(makeAppointment({ appointment, token }));
  };
  return (
    <>
      {isLoading && <h1>loading</h1>}
      {isAuth && !isLoading ? (
        <>
          <DatePicker
            disabledDate={disabledDate}
            showTime={{ defaultValue: dayjs('00', 'HH') }}
            onChange={onSelectDate}
            format={dateFormat}
          />
          <Select
            placeholder="Select a barber"
            style={{ width: 200 }}
            options={barbers.map((barber) => ({
              value: barber.id,
              label: `${barber.name} ${barber.lastName}`,
            }))}
            onChange={onSelectBarber}
          />
          <Select
            mode="multiple"
            allowClear
            placeholder="Select a service"
            style={{ width: 200 }}
            options={services.map((service) => ({
              value: service.id,
              label: `${service.name}`,
            }))}
            onChange={onSelectServices}
          />
          <button onClick={onSubmit}>make</button>{' '}
        </>
      ) : (
        !isLoading && <h1>You must be registered</h1>
      )}
    </>
  );
};
