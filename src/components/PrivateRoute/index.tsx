import { FC, useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { RouteNames } from "../../router/routing";
import { AuthContext } from "../Provider/AuthProvider";
import { IAuthContext } from "../../common/interfaces/IAuthContext";

interface IChildren {
  priority: number;
  children?: React.ReactChild | React.ReactChildren | JSX.Element;
}

const PrivateRoute: FC<IChildren> = ({ priority, children }: IChildren) => {
  const location = useLocation();
  const { isAuth } = useContext(AuthContext) as IAuthContext;
  var currentFrom = location.search ? location.search : "";

  if (!isAuth)
    return (
      <>
        <Navigate
          to={RouteNames.login}
          state={{ from: location.pathname + currentFrom }}
        />
      </>
    );
  // else if ()
  return <>{children}</>;
};

export default PrivateRoute;
