import React from "react";
import logo from "../../assets/Img/logo.png";
import { Link, NavLink } from "react-router-dom";
import { BiMenu, BiMoviePlay, BiSearch } from "react-icons/bi";
import "./Navbar.css";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Search from "../Search/Search";
import { IoIosArrowDown } from "react-icons/io";
import { useGlobalContext } from "../../Context";
import { AiFillHome } from "react-icons/ai";
import { MdLiveTv } from "react-icons/md";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [isGenere, setIsGenere] = useState(false);
  const { user, logged, sigIn, signOut } = useGlobalContext();
  const [showsearch, setShowsearch] = useState(true);

  function onToggle() {
    setToggle(!toggle);
  }

  function onGenereToggle() {
    setIsGenere(!isGenere);
  }

  return (
    <>
      <nav className="flex m-auto max-w-[1570px] text-slate-300 justify-between lg:gap-20 gap-6 h-[70px] items-center">
        <div className="logo-menu flex items-center md:gap-12 gap-6">
          <button
            className="text-2xl items-center flex px-3 h-8 rounded-md bg-slate-500"
            onClick={onToggle}
          >
            <BiMenu />
            <span className="text-sm md:inline hidden">Browse</span>
          </button>
          <Link to={"/"}>
            <img
              className="md:max-w-[130px] max-w-[100px]"
              src={logo}
              alt="logo"
            />
          </Link>
        </div>
        <div className={`md:flex w-full ${showsearch ? "block" : "hidden"}`}>
          <Search />
        </div>
        <div className="gap-6 flex items-center text-sm font-bold">
          <div
            className="md:hidden flex text-2xl items-center"
            onClick={() => setShowsearch(!showsearch)}
          >
            <BiSearch />
          </div>
          {logged ? (
            <Link to="profile">@{user.username}</Link>
          ) : (
            <Link
              to={"/login"}
              className="bg-slate-600 rounded-3xl py-1 px-4 min-w-24 flex justify-center items-center w-24 h-9"
            >
              Log In
            </Link>
          )}
        </div>
      </nav>
      {/* Menu  */}
      <div
        id="menu"
        className={`w-full fixed top-0 left-[-120%] h-screen flex justify-between transition-all z-50 ${
          toggle ? "show" : ""
        }`}
      >
        <ul
          className={`absolute top-0 flex flex-col w-[260px] h-full bg-slate-900`}
        >
          <button className="text-2xl mt-5 px-2 w-10" onClick={onToggle}>
            <BiArrowBack />
          </button>
          <Link to={"/"} className="logo block px-2 mt-4" onClick={onToggle}>
            <img className="max-w-[180px]" src={logo} alt="logo" />
          </Link>
          <li className=" min-w-full">
            <NavLink
              onClick={onToggle}
              className="navlink min-w-full border-b border-opacity-50 border-zinc-500 py-3 px-2 flex mt-6 hover:bg-slate-800 gap-2"
              to={"/"}
            >
              <span className="text-xl">
                <AiFillHome />
              </span>
              Home
            </NavLink>
          </li>
          <li className=" min-w-full">
            <NavLink
              onClick={onToggle}
              className="navlink min-w-full border-b border-opacity-50 border-zinc-500 py-3 px-2 flex hover:bg-slate-800 gap-2"
              to={"/movie/page/1"}
            >
              <span className="text-xl">
                <BiMoviePlay />
              </span>
              Movie
            </NavLink>
          </li>
          <li className="">
            <NavLink
              onClick={onToggle}
              className="navlink min-w-full border-b border-opacity-50 border-zinc-500 py-3 px-2 flex hover:bg-slate-800 gap-2"
              to={"/tv-show/page/1"}
            >
              <span className="text-xl">
                <MdLiveTv />
              </span>
              Tv-Show
            </NavLink>
          </li>
          <li className=" min-w-full relative">
            <NavLink
              className="navlink min-w-full border-b border-opacity-50 border-zinc-500 py-3 px-2 items-center flex justify-between hover:bg-slate-800"
              to={"/genere"}
              onClick={onGenereToggle}
            >
              Genere
              <span
                className={`${
                  isGenere ? "-rotate-180" : "rotate-0"
                } flex items-center transition-all duration-300 text-2xl`}
              >
                <IoIosArrowDown />
              </span>
            </NavLink>
            <ul className={` top-8 left-0 ${isGenere ? "block" : "hidden"}`}>
              <li className="">
                <NavLink
                  className="bg-slate-700 w-full px-2 pl-6 py-2 border-b border-slate-700 bg-opacity-30 hover:bg-slate-600 inline-block"
                  to={"/genere"}
                  onClick={onToggle}
                >
                  All
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  className="bg-slate-700 w-full px-2 pl-6 py-2 border-b border-slate-700 bg-opacity-30 hover:bg-slate-600 inline-block"
                  to={"/genere/sci-fi"}
                  onClick={onToggle}
                >
                  Si-fi
                </NavLink>
              </li>
              <li className="">
                <Link
                  className="bg-slate-700 w-full px-2 pl-6 py-2 border-b border-slate-700 bg-opacity-30 hover:bg-slate-600 inline-block"
                  to={"/genere/cartoon"}
                  onClick={onToggle}
                >
                  Cartoon
                </Link>
              </li>
              <li className="">
                <NavLink
                  className="bg-slate-700 w-full px-2 pl-6 py-2 border-b border-slate-700 bg-opacity-30 hover:bg-slate-600 inline-block"
                  to={"/genere/romance"}
                  onClick={onToggle}
                >
                  Romance
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  className="bg-slate-700 w-full px-2 pl-6 py-2 border-b border-slate-700 bg-opacity-30 hover:bg-slate-600 inline-block"
                  to={"/genere/action"}
                  onClick={onToggle}
                >
                  Action
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  className="bg-slate-700 w-full px-2 pl-6 py-2 border-b border-slate-700 bg-opacity-30 hover:bg-slate-600 inline-block"
                  to={"/genere/horror"}
                  onClick={onToggle}
                >
                  Horror
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="">
            <NavLink
              onClick={onToggle}
              className="navlink min-w-full border-b border-opacity-50 border-zinc-500 py-3 px-2 flex hover:bg-slate-800"
              to={"/about"}
            >
              About us
            </NavLink>
          </li>
          <li className="">
            <NavLink
              onClick={onToggle}
              className="navlink min-w-full border-b border-opacity-50 border-zinc-500 py-3 px-2 flex hover:bg-slate-800"
              to={"/dashboard"}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="px-2">
            {logged ? (
              <div className="flex justify-between min-w-full">
                <span className="min-w-[100px] block rounded-3xl bg-slate-800 py-2 mt-4 text-center hover:bg-orange-400">
                  @{user.username}
                </span>
                <span
                  className="min-w-[100px] block rounded-3xl bg-red-500 py-2 mt-4 text-center hover:bg-orange-400"
                  onClick={signOut}
                >
                  Sign Out
                </span>
              </div>
            ) : (
              <div className="flex justify-between w-full">
                <Link
                  to={"/login"}
                  className="min-w-[100px] block rounded-3xl bg-slate-800 py-2 mt-4 text-center hover:bg-orange-400"
                >
                  Log in
                </Link>
                <Link
                  to={"/signup"}
                  className="min-w-[100px] block rounded-3xl bg-slate-800 py-2 mt-4 text-center hover:bg-orange-400"
                >
                  Sign up
                </Link>
              </div>
            )}
          </li>
        </ul>
        <div className="w-full h-full" onClick={() => setToggle(false)}></div>
      </div>
    </>
  );
};

export default Navbar;
