import Navbar from "../Component/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Scroll from "../Component/Scroll/Scroll";
import { useMovieContext } from "../Context";
import { FiLoader } from "react-icons/fi";
import { useEffect } from "react";

const Layout = () => {
  const { isloading, fetchMovies } = useMovieContext();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  return (
    <>
      <Scroll />
      <header className=" bg-[#020D18] px-2 py-2 bg-opacity-80 backdrop-blur-sm fixed top-0 z-50 w-[99.99%]">
        <Navbar />
      </header>
      {isloading ? (
        <div className="min-h-[90vh] text-4xl flex items-center justify-center">
          <span className="w-26 h-26 flex items-center justify-center animate-spin">
            <FiLoader />
          </span>
        </div>
      ) : (
        <main className={`min-h-[90vh] pt-[80px] bg-cover bg-center`}>
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
