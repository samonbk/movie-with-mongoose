import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import MovieCard from "../Card/MovieCard";

const MoviePlay = () => {
  const { name } = useParams();
  let navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [moviedetail, setMoviededail] = useState([]);
  const [randommovies, setRandommovies] = useState([]);
  const [sizex, setSizex] = useState(300);

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
    fetch("https://samon-movieforkh-api.vercel.app")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data.moviedata);
        const detail = data.moviedata.find((movie) => movie.name === name);
        setMoviededail(detail);
      })
      .catch((error) =>
        console.error(
          "There has been a problem with your fetch operation:",
          error
        )
      );
  }, [name]);

  useEffect(() => {
    if (moviedetail) {
      const title = moviedetail.name;
      document.title = "watch " + title + " free - Moviesforkh";
    }
  }, [moviedetail]);

  useEffect(() => {
    if (movie.length === 0) return; // Ensure that the movie array is populated

    const currentUrl = window.location.href; // Get the current URL
    const storageKey = `randommovies_${currentUrl}`; // Create a unique key based on the URL
    const storedMovies = localStorage.getItem(storageKey);

    if (storedMovies) {
      setRandommovies(JSON.parse(storedMovies));
    } else {
      const randomNumberSet = new Set();

      while (randomNumberSet.size < 12 && randomNumberSet.size < movie.length) {
        const random = Math.floor(Math.random() * movie.length);
        randomNumberSet.add(random);
      }

      const uniqueRandomMovies = Array.from(randomNumberSet).map(
        (index) => movie[index]
      );

      localStorage.setItem(storageKey, JSON.stringify(uniqueRandomMovies));

      setRandommovies(uniqueRandomMovies);
    }
  }, [movie]);

  return (
    <>
      <section className="max-w-[1570px] m-auto  px-2">
        <div
          className="text-2xl md:mt-3 mt-8
          px-2"
        >
          <button onClick={() => navigate(-1)}>
            <BiArrowBack />
          </button>
        </div>
        <div className="w-full m-auto mt-3">
          <iframe
            className="w-full md:h-[650px] sm:h-[450px] h-[200px]"
            // width="100%"
            // height="650"
            src={moviedetail.source}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-4 flex w-full gap-4 bg-[#0e1824] md:flex-row flex-col mt-3">
          <div className="max-w-[200px] max-h-[300px] overflow-hidden flex items-center">
            <img
              className="w-full"
              src={moviedetail.img}
              alt={moviedetail.name}
            />
          </div>
          <div className="text-gray-400 max-w-[1020px]">
            <h2 className="text-3xl text-gray-100">{moviedetail.name}</h2>
            <p className="mt-5">{moviedetail.detail}</p>
            <div className="mt-3 *:mt-1">
              <h2>
                Genere:
                <span className=" text-gray-100"> {moviedetail.genere}</span>
              </h2>
              <h2>
                Release Date:
                <span className=" text-gray-100"> {moviedetail.release}</span>
              </h2>
              <h2>
                Run Time:{" "}
                <span className=" text-gray-100"> {moviedetail.runtime}</span>
              </h2>
              <h2 className="flex items-center gap-2">
                Rate:
                <span className="text-orange-400 text-sm flex items-center gap-1">
                  <BsStarFill />
                  {moviedetail.rate}/10
                </span>
              </h2>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mt-6 text-xl px-4 border-l-4">You might also like</h2>
        </div>
        <section className=" w-full m-auto grid lg:grid-cols-6 grid-cols-2 md:grid-cols-4 mt-4 gap-3">
          {randommovies.map(({ id, img, name, rate, release }) => (
            <div key={id} className="max-h-[370px]">
              <MovieCard
                hight={sizex}
                img={img}
                name={name}
                rate={rate}
                release={release}
              />
            </div>
          ))}
        </section>
      </section>
    </>
  );
};

export default MoviePlay;
