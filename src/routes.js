import React from "react";
import { useRoutes } from "react-router-dom";
import { Main, Register, RegisterComplete, RegisterIntegrated, Notfound } from "./pages";
import { LayoutProvider } from "./Layout";

const AppRoutes = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <LayoutProvider />,
      children: [
        { path: "/", element: <Main title="Main" />},
        { path: "/signup", element: <Register title="회원가입" />},
        { path: "/signup/integrated", element: <RegisterIntegrated title="통합 회원가입" />},
        { path: "/signup/complete", element: <RegisterComplete title="가입완료" />},
        { path: "*",  element: <Notfound title="Notfound" />}
      ]
    }
  ]);

  return element;
};

export default AppRoutes;