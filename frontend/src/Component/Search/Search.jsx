import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiX } from "react-icons/bi";

const Search = () => {
  const [items, setItems] = useState("");
  const [movie, setMovie] = useState([]);
  const [searchFiltermovie, setSearchFiltermovie] = useState([]);

  useEffect(() => {
    fetch("https://samon-movieforkh-api.vercel.app")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setMovie(data.moviedata))
      .catch((error) =>
        console.error(
          "There has been a problem with your fetch operation:",
          error
        )
      );
  }, [movie]);

  function onSearchChange(e) {
    const searchTerm = e.target.value.toLowerCase();
    setItems(searchTerm);

    // Normalize a string by removing all non-alphanumeric characters
    const normalizeString = (str) => {
      return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    };

    // Filter the movies based on the normalized search term
    const filtermovie = movie.filter((movie) => {
      const normalizedMovieName = normalizeString(movie.name);

      // Compare normalized movie name with normalized search term
      return normalizedMovieName.includes(normalizeString(searchTerm));
    });

    setSearchFiltermovie(filtermovie);
  }

  return (
    <>
      <div className="flex bg-slate-700 w-full m-auto md:relative z-40 fixed top-[70px] md:top-0 left-0 md:rounded-sm h-9">
        <input
          className="bg-transparent focus:outline-none p-2 w-full"
          onChange={onSearchChange}
          value={items}
          type="text"
          placeholder="Search movie"
        />
        <button
          onClick={() => setItems("")}
          className={`items-center text-xl underline text-white font-bold ${
            items ? "flex" : "hidden"
          }`}
        >
          <BiX />
        </button>
        <button className="text-white text-2xl min-w-10 border-l w-12 border-slate-300 flex border-opacity-30 items-center justify-center rounded-r-[25px]">
          <BiSearch />
        </button>
        <div
          className={`absolute top-10 left-0 w-full bg-zinc-900 text-black 
          }`}
        >
          {items ? (
            searchFiltermovie.slice(0, 3).map((m) => (
              <Link
                to={`movie/playpage/${m.name}`}
                onClick={() => setItems("")}
                key={m.id}
                className="flex gap-4 mt-2 bg-slate-800 p-2 rounded-md text-gray-400"
              >
                <div className="md:max-w-[80px] max-w-[60px]">
                  <img src={m.img} alt={m.name} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{m.name}</h2>
                  <h2>{m.release}</h2>
                  <div className="flex gap-2 items-center">
                    <span>{m.rate}/10</span>
                    <span className="text-yellow-600">
                      <BsStarFill />
                    </span>
                  </div>
                  <h2>{m.runtime}</h2>
                  <h2>#{m.genere}</h2>
                </div>
              </Link>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
