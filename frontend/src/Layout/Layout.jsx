import Navbar from "../Component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Scroll from "../Component/Scroll/Scroll";
import { useGlobalContext } from "../Context";
import { FiLoader } from "react-icons/fi";

const Layout = () => {
  const { isloading } = useGlobalContext();
  return (
    <>
      <Scroll />
      <header className=" bg-[#020D18] px-2 py-2 bg-opacity-80 backdrop-blur-sm sticky top-0 z-50 w-[99.99%]">
        <Navbar />
      </header>
      {isloading ? (
        <div className="min-h-[90vh] text-4xl flex items-center justify-center">
          <span className="w-26 h-26 flex items-center justify-center animate-spin">
            <FiLoader />
          </span>
        </div>
      ) : (
        <main className={`min-h-[90vh] bg-cover bg-center`}>
          <Outlet />
        </main>
      )}
      <footer className="w-full text-lg text-center py-2 bg-slate-800 mt-16">
        mymovie-project 2024
      </footer>
    </>
  );
};

export default Layout;
