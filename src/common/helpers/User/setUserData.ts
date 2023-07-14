import Cookies from "js-cookie";
import { IUser } from "../../interfaces/User/IUser";

export const setUserData = (data: IUser) => {
  Cookies.set("orlan_token", data.token, { expires: 1 });

  window.location.replace("/");
};
