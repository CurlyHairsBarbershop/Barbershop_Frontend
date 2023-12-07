export interface Review {
  reviews:
  {
    'id': number,
    'title': string,
    'content': string,
    'rating': number,
    'publisher': {
      'name': string,
      'lastName': number,
      'email': number,
      'role': null
    },
    'replies': []
  }[]
  ,
  id: number;
  email: string;
  name: string;
  lastName: string,
  phoneNumber: string,
  earnings: number,
  rating: number,
  imageUrl: string;
}