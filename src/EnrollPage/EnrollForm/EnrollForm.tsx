import { redirect, useNavigate } from 'react-router-dom';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Select } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { getAccount } from '../../store/auth/asyncThunks';
import { getCookie } from '../../helpers/common';
import { Barber } from '../../types/Barber/Barber';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current < dayjs().endOf('day');
};

interface EnrollModel {
  at: Date;
  barberId: number;
  serviceIds: number[];
}

const schema = yup
  .object({
    at: yup.date().required('Choose a date'),
    barberId: yup.number().required('Choose a barber'),
    serviceIds: yup.array().of(yup.number()).required('Choose service(-s)'),
  })
  .required();

export const EnrollForm = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<EnrollModel>({
    resolver: yupResolver(schema),
  });
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const barbers: Barber[] = useAppSelector((state) => state.barber.barbers);
  const token = getCookie('token');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAccount(token as string));

    // if (!isAuth) {
    //   navigate('/login');
    // }
  }, [dispatch]);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(dateString);
  };

  // const onSubmit: SubmitHandler<LoginModel> = async (data) => {
  //   const response = await dispatch(signIn(data));
  // };
  return (
    <form>
      <DatePicker
        disabledDate={disabledDate}
        showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
        onChange={onChange}
      />
      <Select
        placeholder="Select a barber"
        style={{ width: 200 }}
        options={barbers.map(barber => ({value: barber.id, label: `${barber.name} ${barber.lastName}`}))}
      />
    </form>
  );
};
