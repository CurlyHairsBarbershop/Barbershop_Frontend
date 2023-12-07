import { Barber } from '../Barber/Barber';
import { Service } from '../Service/Service';

export interface Appointment {
  at: Date;
  barberId: number;
  serviceIds: number[];
}

export interface FullAppointment {
  id: number;
  at: Date;
  barber: Barber;
  favors: Service[];
}