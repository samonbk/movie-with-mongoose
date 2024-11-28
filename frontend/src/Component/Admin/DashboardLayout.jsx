import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import DashNavbar from "./DashNavbar";
import { BiMenu } from "react-icons/bi";
import { useGlobalContext } from "../../Context";

const DashboardLayout = () => {
  const { user, logged, signOut } = useGlobalContext();

  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full pr-3">
      <div
        className={`fixed w-[290px] top-0 ${
          show ? "left-0" : "left-[-300px]"
        } transition-all duration-300`}
      >
        <DashNavbar />
      </div>
      <div
        className={`${
          show ? "pl-[300px]" : "pl-[10px]"
        } max-w-full transition-all duration-300`}
      >
        <div className="rounded-xl h-[70px] mt-4 bg-slate-600 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <div
              className="text-3xl flex items-center"
              onClick={() => setShow(!show)}
            >
              <BiMenu />
            </div>
            <h1 className="text-2xl">Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={user.img}
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
            {logged ? (
              <Link to="profile">@{user.username}</Link>
            ) : (
              <Link
                to={"login"}
                className="bg-slate-600 rounded-3xl py-1 px-4 min-w-24 flex justify-center border items-center w-24 h-9"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
