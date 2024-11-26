import React from "react";
import { Outlet } from "react-router-dom";
import DashNavbar from "./DashNavbar";
import { BiMenu } from "react-icons/bi";

const DashboardLayout = () => {
  return (
    <div className="relative w-screen">
      <DashNavbar />
      <div className="pl-[300px] pr-3">
        <div className="w-full rounded-xl h-[70px] mt-4 bg-slate-600 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl flex items-center">
              <BiMenu />
            </div>
            <h1 className="text-2xl">Admin</h1>
          </div>
          <div>
            <img src="" alt="profile" className="w-12 h-12 rounded-full" />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
