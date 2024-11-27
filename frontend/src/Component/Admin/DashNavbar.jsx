import React from "react";
import logo from "../../assets/Img/logo.png";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Context";

const DashNavbar = () => {
  const { user, logged, sigIn, signOut } = useGlobalContext();

  const onSignout = () => {
    signOut();
  };

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
          <li className="px-2">
            {logged ? (
              <div className="flex justify-between min-w-full">
                <span className="min-w-[100px] block rounded-3xl bg-slate-800 py-2 mt-4 text-center hover:bg-orange-400">
                  @{user.username}
                </span>
                <span
                  className="min-w-[100px] block rounded-3xl bg-red-500 py-2 mt-4 text-center hover:bg-orange-400"
                  onClick={onSignout}
                >
                  Sign Out
                </span>
              </div>
            ) : (
              <div className="flex justify-between w-full">
                <Link
                  to={"/admin/login"}
                  className="min-w-[100px] block rounded-3xl bg-slate-800 py-2 mt-4 text-center hover:bg-orange-400"
                >
                  Log in
                </Link>
                <Link
                  to={"/admin/signup"}
                  className="min-w-[100px] block rounded-3xl bg-slate-800 py-2 mt-4 text-center hover:bg-orange-400"
                >
                  Sign up
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashNavbar;
