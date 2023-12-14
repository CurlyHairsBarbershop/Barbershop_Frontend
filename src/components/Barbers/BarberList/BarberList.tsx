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

// const barber = {
//   name: 'Andriy',
//   lastName: 'Shevchenko',
//   email: 'barber123@gmail.com',
//   phoneNumber: '+380952552334',
//   image:
//     'https://gentlemensclub.com.ua/storage/barbers/October2023/N5PTEfNBm9Erz49spyzB.jpg',
//   description:
//     'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum tenetur molestias quaerat repudiandae maiores explicabo labore fuga est ullam! Quidem.',
// };

export const BarberList = () => {
  const dispatch = useAppDispatch();
  const barbers: Barber[] = useAppSelector((state) => state.commercial.barbers);
  const lastReview = useAppSelector((state) => state.commercial.lastReview);
  const token = getCookie('token');

  const isBarberAddedToFavourites = useAppSelector(
    (state) => state.commercial.isFavouriteBarberMessage,
  );

  const lastEditedBarber = useAppSelector(
    (state) => state.commercial.editedBarber,
  );

  const lastDeletedBarber = useAppSelector(
    (state) => state.commercial.deletedBarber,
  );

  useEffect(() => {
    if (token) {
      dispatch(getFavouriteBarbers(token as string));
    }
  }, [dispatch, isBarberAddedToFavourites]);

  useEffect(() => {
    dispatch(getBarbers());
    dispatch(getFavouriteBarbers(token as string));
  }, [dispatch, lastReview, lastEditedBarber, lastDeletedBarber]);

  return (
    <Row style={{ rowGap: '20px', marginBottom: '40px' }}>
      {barbers?.map((barber, i) => <BarberCard barber={barber} key={i} />)}
    </Row>
  );
};
