import React from "react";
import logo from "../../assets/Img/logo.png";
import { Link } from "react-router-dom";

const DashNavbar = () => {
  return (
    <div>
      <nav className="h-screen w-[290px] fixed top-0 left-0 bg-slate-700 p-4">
        <div>
          <img src={logo} alt="" />
        </div>
        <ul className="flex flex-col min-w-full">
          <li className=" w-full">
            <Link
              className="py-3 border-b border-t min-w-full block mt-8"
              to={"/admin"}
            >
              Dashboard
            </Link>
          </li>
          <li className=" w-full">
            <Link className="py-3 border-b min-w-full block" to={"table"}>
              Table
            </Link>
          </li>
          <li className=" w-full">
            <Link className="py-3 border-b min-w-full block" to={"add_movie"}>
              add movie
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashNavbar;
