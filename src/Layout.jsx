import React from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LayoutProvider = () => {
  return (
    <>
      <Outlet />
    </>
  )
}
export {LayoutProvider};