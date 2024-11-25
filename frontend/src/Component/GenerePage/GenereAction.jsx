import React, { useRef, useState, useEffect } from "react";
import MovieCard from "../Card/MovieCard";
import { useGlobalContext } from "../../Context";

const GenereAction = () => {
  const [allmovie, setAllmovie] = useState([]);
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

  const actionFilter = moviedata.filter((movie) =>
    movie.genere.toLowerCase().includes("action")
  );

  return (
    <>
      <section className="">
        <h1 className="text-xl px-4 border-l-4">Action</h1>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-3 mt-4">
          {actionFilter?.slice(0, 12).map((m) => (
            <div key={m.id} className="rounded-lg">
              <MovieCard
                hight={sizex}
                id={m.id}
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
