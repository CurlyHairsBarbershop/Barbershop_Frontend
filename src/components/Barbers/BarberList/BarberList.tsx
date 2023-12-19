import { useEffect } from 'react';
import { Row } from 'antd';
import { BarberCard } from '../BarberCard/BarberCard';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import {
  getBarbers,
  getFavouriteBarbers,
} from '../../../store/commercial/asyncThunks';
import { Barber } from '../../../types/Barber/Barber';
import { getCookie } from '../../../helpers/common';

export const BarberList = () => {
  const dispatch = useAppDispatch();
  const barbers: Barber[] = useAppSelector((state) => state.commercial.barbers);
  const lastReview = useAppSelector((state) => state.commercial.lastReview);
  const token = getCookie('token');

  const isBarberAddedToFavourites = useAppSelector(
    (state) => state.commercial.isFavouriteBarberMessage,
  );

  useEffect(() => {
    if (token) {
      dispatch(getFavouriteBarbers(token as string));
    }
  }, [dispatch, isBarberAddedToFavourites]);

  useEffect(() => {
    dispatch(getBarbers());
    dispatch(getFavouriteBarbers(token as string));
  }, [dispatch, lastReview]);

  return (
    <Row style={{ rowGap: '20px', marginBottom: '40px' }}>
      {barbers?.map((barber, i) => <BarberCard barber={barber} key={i} />)}
    </Row>
  );
};
