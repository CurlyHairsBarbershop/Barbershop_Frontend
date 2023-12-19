import { FC } from 'react';
import { FavouriteBarbersWrapper } from './styles';
import { UpperBarber } from '../../../types/Barber/Barber';

type Props = {
  barbers: UpperBarber[];
};

export const FavouriteBarbersList: FC<Props> = ({ barbers }) => {
  console.log('barbers: ', barbers);
  
  return (
    <>
      <FavouriteBarbersWrapper>
        {barbers.map((barber) => (
          <p key={barber.Id}>{barber.Email}</p>
        ))}
      </FavouriteBarbersWrapper>
    </>
  );
};
