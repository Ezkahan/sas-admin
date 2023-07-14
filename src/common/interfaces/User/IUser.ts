export interface IUser {
  id?: number;
  firstname?: string;
  lastname?: string;
  fullname?: string;
  photo?: string;
  birth_day?: string;
  phone: string;
  email?: string;
  gender?: string;
  device?: string;
  message?: string;
  token: string;
  addresses: IUserAddresses;
}

export interface IUserAddresses {
  id: number;
  address: string;
}
