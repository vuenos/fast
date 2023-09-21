import React from "react";
import { useRoutes } from "react-router-dom";
import { Main, Register, Notfound } from "./pages";
import { LayoutProvider } from "./Layout";

const AppRoutes = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <LayoutProvider />,
      children: [
        { path: "/", element: <Main title="Main" />},
        { path: "/register", element: <Register title="회원가입" />},
        { path: "*",  element: <Notfound title="Notfound" />}
      ]
    }
  ]);

  return element;
};

export default AppRoutes;