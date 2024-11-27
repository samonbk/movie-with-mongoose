import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext, useMovieContext } from "../../Context";

const DashBoard = () => {
  const { user, logged } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { movies, fetchMovies } = useMovieContext();

  // console.log(user);

  const [typemovie, setTypemovie] = useState(0);
  const [typetvshow, setTypetvshow] = useState(0);
  const [generescifi, setGenerescifi] = useState(0);
  const [genereaction, setGenereaction] = useState(0);
  const [generecartoon, setGenerecartoon] = useState(0);
  const [generedrama, setGeneredrama] = useState(0);
  const [generehorror, setGenerehorror] = useState(0);

  useEffect(() => {
    if (!logged) {
      navigate("/admin/login");
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchMovies();
      if (movies) {
        const typetv = movies.filter(
          (movie) => movie.type === "tv-show"
        ).length;
        const typem = movies.filter((movie) => movie.type === "movie").length;
        setTypemovie(typem);
        setTypetvshow(typetv);

        const scifi = movies.filter((movie) =>
          movie.genere.toLowerCase().includes("sci-fi")
        ).length;
        setGenerescifi(scifi);

        const cartoon = movies.filter((movie) =>
          movie.genere.toLowerCase().includes("cartoon")
        ).length;
        setGenerecartoon(cartoon);

        const drama = movies.filter((movie) =>
          movie.genere.toLowerCase().includes("drama")
        ).length;
        setGeneredrama(drama);

        const action = movies.filter((movie) =>
          movie.genere.toLowerCase().includes("action")
        ).length;
        setGenereaction(action);

        const horror = movies.filter((movie) =>
          movie.genere.toLowerCase().includes("horror")
        ).length;
        setGenerehorror(horror);
      }
    };

    fetchData();
  }, [movies]);

  return (
    <>
      <div className="max-w-[1570px] m-auto px-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-gray-500 mt-4">Dashboard</h1>
        </div>
        <div className="mt-4 grid md:grid-cols-4 grid-cols-2 gap-10">
          <div className="rounded-xl bg-gray-500 h-[150px] flex flex-col gap-3 items-center justify-center">
            <h3 className="text-3xl">All</h3>
            <span className="text-5xl">{movies.length}</span>
          </div>
          <div className="rounded-xl bg-blue-500 h-[150px] flex flex-col gap-3 items-center justify-center">
            <h3 className="text-3xl">Movies</h3>
            <span className="text-5xl">{typemovie}</span>
          </div>
          <div className="rounded-xl bg-orange-400 h-[150px] flex flex-col gap-3 items-center justify-center">
            <h3 className="text-3xl">TV-show</h3>
            <span className="text-5xl">{typetvshow}</span>
          </div>
          <div className="rounded-xl bg-indigo-500 h-[150px] flex flex-col gap-3 items-center justify-center">
            <h3 className="text-3xl">Sci-fi</h3>
            <span className="text-5xl">{generescifi}</span>
          </div>
          <div className="rounded-xl bg-teal-500 h-[150px] flex flex-col gap-3 items-center justify-center">
            <h3 className="text-3xl">Cartoon</h3>
            <span className="text-5xl">{generecartoon}</span>
          </div>
          <div className="rounded-xl bg-pink-500 h-[150px] flex flex-col gap-3 items-center justify-center">
            <h3 className="text-3xl">Drama</h3>
            <span className="text-5xl">{generedrama}</span>
          </div>
          <div className="rounded-xl bg-green-600 h-[150px] flex flex-col gap-3 items-center justify-center">
            <h3 className="text-3xl">Action</h3>
            <span className="text-5xl">{genereaction}</span>
          </div>
          <div className="rounded-xl bg-cyan-600 h-[150px] flex flex-col gap-3 items-center justify-center">
            <h3 className="text-3xl">Horror</h3>
            <span className="text-5xl">{generehorror}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
