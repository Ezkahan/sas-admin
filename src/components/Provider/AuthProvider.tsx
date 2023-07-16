import { createContext, FC, useState } from "react";

import { IAuthContext } from "../../common/interfaces/IAuthContext";
import IChildren from "../../common/interfaces/IChildren";
import { IUser } from "../../pages/User/IUser";

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider: FC<IChildren> = ({ children }: IChildren) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUserData] = useState<IUser | null>(null);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, setUserData, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
