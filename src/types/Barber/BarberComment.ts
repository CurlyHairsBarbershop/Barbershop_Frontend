export interface BarberComment {
  id: number,
  title: string,
  content: string,
  rating: number,
  publisher: {
    name: string,
    lastName: string,
    email: string,
    role: string,
  }
}

export interface BarberCommentBody {
  title: string,
  content: string,
  rating: number,
  barberEmail: string
}