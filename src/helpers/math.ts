import { Service } from '../types/Service/Service';

export function calculateTotalCost(favors: Service[]): number {
  return favors.reduce((total, favor) => total + favor.cost, 0);
}