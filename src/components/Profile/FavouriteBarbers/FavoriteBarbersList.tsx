import { FC } from 'react';
import { Barber } from '../../../types/Barber/Barber';
import { FavouriteBarbersWrapper } from './styles';

type Props = {
  barbers: UpperBarber[];
};

export const FavouriteBarbersList: FC<Props> = ({ barbers }) => {
  console.log('barbers: ', barbers);
  
  return (
    <>
      <FavouriteBarbersWrapper>
        {barbers.map((barber) => (
          <p key={barber.id}>{barber.Email}</p>
        ))}
      </FavouriteBarbersWrapper>
    </>
  );
};
