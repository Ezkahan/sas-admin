export interface IUser {
  id: number;
  firstname: String;
  lastname: String;
  photo: String;
  birth_day: String;
  phone: String;
  email: String;
  password: String;
  role_id: String;
  gender: String;
  device: String;
  token: String;
  message: String;
}

export interface ILogin {
  phone: string;
  password: string;
}