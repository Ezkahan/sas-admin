import { IUserData } from "./User/IUserData";

export type IAuthContext = {
  isAuth: boolean;
  user: IUserData | null;
  setIsAuth: (isAuth: boolean) => void;
  setUserData: (data: IUserData) => void;
};
