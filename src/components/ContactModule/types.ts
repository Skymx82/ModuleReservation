// Types partagés pour le module de réservation
export interface RoomType {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  phoneCode: string;
  phone: string;
  comment: string;
}

export interface DateRangeType {
  startDate: Date | null;
  endDate: Date | null;
  key: string;
}
