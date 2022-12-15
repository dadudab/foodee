export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  address: string;
  postalCode: string;
  isAdmin: boolean;
  timestamp: Date;
  token: string;
}
