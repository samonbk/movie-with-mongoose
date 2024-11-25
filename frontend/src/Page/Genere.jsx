import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoCaretDownOutline } from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { FiLoader } from "react-icons/fi";

const Genere = () => {
  const { isloading } = useGlobalContext();
  const [listToggle, seListToggle] = useState(false);

  function onListToggle() {
    seListToggle(!listToggle);
  }

  useEffect(() => {
    onListToggle();
    document.title = "Moviesforkh - free movie streaming site online";
  }, []);

  return (
    <>
      <div className="max-w-[1220px] m-auto px-2">
        {/* Option  */}
        <div className="mt-5 rounded-md w-28 bg-slate-800 relative">
          <div
            className="px-2 flex justify-between h-10 items-center"
            onClick={onListToggle}
          >
            <span>All</span>
            <button>
              <IoCaretDownOutline />
            </button>
          </div>
          <ul
            className={`absolute top-10 w-full left-0 p-2 bg-slate-800 z-30 flex-col ${
              !listToggle ? "flex" : "hidden"
            }`}
          >
            <li>
              <NavLink
                onClick={onListToggle}
                className="py-2 px-2 border-b border-slate-600 border-opacity-40 block"
                to={"/genere"}
              >
                All
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onListToggle}
                to={"sci-fi"}
                className="py-2 px-2 border-b border-slate-600 border-opacity-40 block genere"
              >
                Sci-fi
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onListToggle}
                to={"cartoon"}
                className="py-2 px-2 border-b border-slate-600 border-opacity-40 block genere"
              >
                Cartoon
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onListToggle}
                to={"romance"}
                className="py-2 px-2 border-b border-slate-600 border-opacity-40 block genere"
              >
                Romance
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onListToggle}
                to={"action"}
                className="py-2 px-2 border-b border-slate-600 border-opacity-40 block genere"
              >
                Action
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onListToggle}
                to={"horror"}
                className="py-2 px-2 border-b border-slate-600 border-opacity-40 block genere"
              >
                Horror
              </NavLink>
            </li>
          </ul>
        </div>
        <section className="mt-14">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default Genere;
