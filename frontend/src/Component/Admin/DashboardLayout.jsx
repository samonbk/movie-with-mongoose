import React from "react";
import { Outlet } from "react-router-dom";
import DashNavbar from "./DashNavbar";

const DashboardLayout = () => {
  return (
    <div className="relative w-screen">
      <DashNavbar />
      <div className="pl-[300px]">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
