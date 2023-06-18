import React from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { IRoute, routing } from "./routing";
import PrivateRoute from "../components/common/PrivateRoute";
import FullLoader from "../components/Loader/FullLoader";

const WebRoutes = () => {
  return (
    <React.Suspense fallback={() => <FullLoader />}>
      <AnimatePresence exitBeforeEnter>
        <Routes>
          {routing.map((r: IRoute) => {
            if (r.private)
              return (
                <Route
                  key={r.path}
                  path={r.path}
                  element={
                    <PrivateRoute key={r.path} priority={r.priority}>
                      {<r.element nav={r.nav} />}
                    </PrivateRoute>
                  }
                ></Route>
              );
            return (
              <Route
                key={r.path}
                path={r.path}
                element={<r.element priority={r.priority} />}
              ></Route>
            );
          })}
        </Routes>
      </AnimatePresence>
    </React.Suspense>
  );
};

export default WebRoutes;
