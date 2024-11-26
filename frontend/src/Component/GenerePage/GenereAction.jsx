import React, { useRef, useState, useEffect } from "react";
import MovieCard from "../Card/MovieCard";
import { useMovieContext } from "../../Context";

const GenereAction = () => {
  const [sizex, setSizex] = useState(300);
  const { movies, fetchMovies } = useMovieContext();

  useEffect(() => {
    fetchMovies();
    setInterval(() => {
      const wx = window.innerWidth;
      if (wx > 768) {
        setSizex(370);
      } else {
        setSizex(340);
      }
    }, 200);
  }, [fetchMovies]);

  const actionFilter = movies.filter((movie) =>
    movie.genere.toLowerCase().includes("action")
  );

  return (
    <>
      <section className="">
        <h1 className="text-xl px-4 border-l-4">Action</h1>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-3 mt-4">
          {actionFilter?.slice(0, 12).map((m) => (
            <div key={m._id} className="rounded-lg">
              <MovieCard
                hight={sizex}
                id={m._id}
                img={m.img}
                name={m.name}
                rate={m.rate}
                release={m.release}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default GenereAction;
