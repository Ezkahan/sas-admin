import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { IRoute, routing } from "./routing";
import PrivateRoute from "../components/common/PrivateRoute";
import React from "react";
import FullLoader from "../components/Loader/FullLoader";

const WebRoutes = () => {
  return (
    <React.Suspense fallback={<FullLoader />}>
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
          {/* <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/company/create" element={<CreateCompany />} />
        <Route path="/company/:id/edit" element={<EditCompany />} />
        <Route path="/company/:id" element={<ShowCompany />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/people" element={<People />} />
        <Route path="/person/add" element={<AddPerson />} />
        <Route path="/person/:id/edit" element={<EditPerson />} />
        <Route path="/education" element={<Education />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/location" element={<Location />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/towns" element={<Towns />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chats" element={<Chat />} /> */}
        </Routes>
      </AnimatePresence>
    </React.Suspense>
  );
};

export default WebRoutes;
