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

export interface UpperBarber {
  Id: number,
  Name: string,
  LastName: string,
  Email: string,
  PhoneNumber: string,
  ImageUrl: string,
  Description: string,
  Reviews: BarberComment[],
  Earnings: number,
  Rating: 0,
}
