import React, { useEffect, useState } from "react";
import Trending, { TrendingRight } from "../Component/Trending/Trending";
import MovieCard from "../Component/Card/MovieCard";
import { MdKeyboardDoubleArrowRight, MdLiveTv } from "react-icons/md";
import { useGlobalContext } from "../Context";
import { BsPlayCircle } from "react-icons/bs";

const Home = () => {
  const [lastesmovie, setLastestmovie] = useState([]);
  const [slice, setSlice] = useState(24);
  const [type, setType] = useState("");
  const [sizex, setSizex] = useState(300);
  const { moviedata } = useGlobalContext();

  useEffect(() => {
    setInterval(() => {
      const wx = window.innerWidth;
      if (wx > 768) {
        setSizex(370);
      } else {
        setSizex(340);
      }
    }, 200);
  }, []);

  useEffect(() => {
    const sortedArray = moviedata.sort((a, b) => b.id - a.id);
    setLastestmovie(sortedArray);
    if (type) {
      const newtype = moviedata.filter((movie) => movie.type === type);
      setLastestmovie(newtype);
    }
    document.title = "Moviesforkh - free movie streaming site online";
  }, [moviedata]);

  function onAllmovie() {
    setType("");
  }

  function onMovie() {
    setType("movie");
  }

  function onTvshow() {
    setType("tv-show");
  }

  function onShowMore() {
    const newSlice = slice + 6;
    setSlice(newSlice);
  }

  return (
    <div className="max-w-[1570px] m-auto">
      <section className="max-w-[1570px] m-auto flex flex-col md:grid grid-cols-12 gap-4 mt-3 px-2">
        <div className=" col-span-8 ">
          <Trending />
        </div>
        <div className=" col-span-4">
          <TrendingRight />
        </div>
      </section>
      <section className="w-full mt-10 px-3">
        <div className="flex gap-3">
          <h1
            className="text-2xl font-semibold cursor-pointer pl-3 border-l-4 border-orange-400"
            onClick={onAllmovie}
          >
            Treding
          </h1>
          <button
            type="button"
            className={`flex gap-1 text-sm items-center bg-slate-500 rounded-md px-2 ${
              type == "movie" ? "text-orange-300" : "text-white"
            }`}
            onClick={onMovie}
          >
            <span className="text-lg">
              <BsPlayCircle />
            </span>
            Movie
          </button>
          <button
            type="button"
            className={`flex gap-1 text-sm items-center bg-slate-500 rounded-md px-2 ${
              type == "tv-show" ? "text-orange-300" : "text-white"
            }`}
            onClick={onTvshow}
          >
            <span className="text-lg">
              <MdLiveTv />
            </span>
            Tv-Show
          </button>
        </div>

        <div className="mt-4 grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 gap-2">
          {lastesmovie
            .slice(0, slice)
            .map(({ id, name, rate, release, img }) => (
              <div key={id}>
                <MovieCard
                  hight={sizex}
                  name={name}
                  rate={rate}
                  img={img}
                  release={release}
                />
              </div>
            ))}
        </div>
      </section>
      <div className="flex justify-center w-full">
        <button className="mt-8 flex items-center gap-1" onClick={onShowMore}>
          Show More{" "}
          <span className="">
            <MdKeyboardDoubleArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Home;
