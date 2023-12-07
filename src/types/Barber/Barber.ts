import { BarberComment } from './BarberComment';

export interface Barber {
  id: number,
  name: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  imageUrl: string,
  description: string,
  reviews: BarberComment[],
  earnings: number,
  rating: 0,
}
