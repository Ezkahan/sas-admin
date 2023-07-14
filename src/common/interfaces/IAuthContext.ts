import { IUser } from "./User/IUser";

export type IAuthContext = {
  isAuth: boolean;
  user: IUser | null;
  setIsAuth: (isAuth: boolean) => void;
  setUserData: (data: IUser) => void;
};
