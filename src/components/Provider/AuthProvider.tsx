import { createContext, FC, useState } from "react";

import { IAuthContext } from "../../common/interfaces/IAuthContext";
import IChildren from "../../common/interfaces/IChildren";
import { IUserData } from "../../common/interfaces/User/IUserData";

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider: FC<IChildren> = ({ children }: IChildren) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUserData] = useState<IUserData | null>(null);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, setUserData, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;