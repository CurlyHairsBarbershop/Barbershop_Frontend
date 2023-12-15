import { useEffect } from 'react';
import { Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { getFavouriteBarbers } from '../../../store/commercial/asyncThunks';
import { getCookie } from '../../../helpers/common';
import { FavouriteBarberCard } from '../FavouriteBarberCard/FavouriteBarberCard';

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

export const FavouriteBarberList = () => {
  const dispatch = useAppDispatch();
  const favouriteBarbers = useAppSelector(
    (state) => state.commercial.favouriteBarbers,
  );
  const token = getCookie('token');

  useEffect(() => {
    if (token) {
      dispatch(getFavouriteBarbers(token as string));
    }
  }, [dispatch]);

  return (
    <Row style={{ rowGap: '20px', marginBottom: '40px' }}>
      {favouriteBarbers?.map((barber, i) => (
        <FavouriteBarberCard barber={barber} key={i} />
      ))}
    </Row>
  );
};
