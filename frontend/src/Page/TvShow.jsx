import React, { useEffect, useState } from "react";
import { BsStarFill, BsPlayCircle } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../Context";

const TvShow = () => {
  const { moviedata } = useGlobalContext();
  const [typemovie, setTypemovie] = useState([]);
  const navigate = useNavigate();
  const [slicemovie, setSlicemovie] = useState([]); // Initialize with the first 10 movies
  const { pageId } = useParams();
  const [page, setPage] = useState(0);
  const [btnPage, setBtnPage] = useState([]);
  const [btns, setBtns] = useState(0);
  const [btne, setBtne] = useState(3);

  function onNextButton() {
    if (parseInt(pageId) < slicemovie.length) {
      const newPage = parseInt(pageId) + 1;
      if (parseInt(pageId) >= 3) {
        const newS = btns + 1;
        const newE = btne + 1;
        setBtns(newS);
        setBtne(newE);
      }
      navigate(`/tv-show/page/${newPage}`);
    } else console.log("You reached the last page");
  }

  function onPrevousButton() {
    if (parseInt(pageId) > 1) {
      const newPage = parseInt(pageId) - 1;

      if (parseInt(pageId) > 3) {
        const newS = btns + 1;
        const newE = btne + 1;
        setBtns(newS);
        setBtne(newE);
      }
      console.log(parseInt(pageId));
      navigate(`/tv-show/page/${newPage}`);
    } else console.log("You reached the first page");
  }

  useEffect(() => {
    const movie = moviedata.filter((mv) => mv.type.includes("tv-show"));
    setTypemovie(movie);
  }, [moviedata]);

  useEffect(() => {
    if (typemovie && typemovie.length > 0) {
      const chunkSize = 10; // Maximum objects per sub-array
      const result = [];
      for (let i = 0; i < typemovie.length; i += chunkSize) {
        const chunk = typemovie.slice(i, i + chunkSize);
        result.push(chunk);
      }
      setSlicemovie(result);
      // console.log(slicemovie.length);

      const parsedPage = parseInt(pageId, 10); // Ensure pageId is an integer
      if (
        !isNaN(parsedPage) &&
        parsedPage <= result.length &&
        parsedPage >= 0
      ) {
        setPage(parsedPage - 1);
      }
    }
  }, [typemovie, pageId]);

  useEffect(() => {
    document.title = "Moviesforkh - free movie streaming site online";
    let index = 0;
    let arr = [];
    while (arr.length < 300) {
      index++;
      arr.push(index);
    }
    setBtnPage(arr);
  }, []);

  return (
    <>
      <section className="mt-2 max-w-[1220px] m-auto px-2">
        <h1 className="mt-10 text-xl">Movive List</h1>
        <div className="w-full flex justify-between text-white mt-3">
          <button
            onClick={onPrevousButton}
            className="bg-slate-500 px-3 py-1 rounded-sm"
          >
            Prevous
          </button>
          <div className="flex gap-2">
            {btnPage.slice(btns, btne).map((index) => (
              <Link
                to={`/tv-show/page/${index}`}
                key={index}
                className={`w-7 h-7 flex justify-center items-center rounded-full text-sm ${
                  index == parseInt(pageId) ? "bg-orange-500" : "bg-slate-500"
                }`}
              >
                {index}
              </Link>
            ))}
          </div>
          <button
            onClick={() => onNextButton()}
            className=" bg-slate-500 px-3 py-1 rounded-sm"
          >
            Next
          </button>
        </div>
        <section className="grid md:grid-cols-1 grid-cols-2 gap-3 mt-3">
          {slicemovie[page] ? (
            slicemovie[page].map((m) => (
              <div key={m.id}>
                <Link
                  to={`/tv-show/playpage/${m.name}`}
                  className="rounded-xl overflow-hidden md:grid grid-cols-12 w-full gap-4 bg-[#0e1824] md:items-center flex flex-col justify-between"
                >
                  <div className="md:col-span-3 md:max-h-[380px] max-w-[] max-h-[270px] overflow-hidden flex items-center justify-center">
                    <img className="min-w-full" src={m.img} alt={m.name} />
                  </div>
                  <div className="text-gray-400 md:col-span-9 p-3 flex flex-col justify-between h-full min-h-[210px]">
                    <h2 className="md:text-3xl text-xl text-gray-100">
                      {m.name}
                    </h2>
                    <p className="mt-5 md:inline-block hidden">{m.detail}</p>
                    <div className="mt-3 md:*:mt-1">
                      <h2>
                        Genere:
                        <span className=" text-gray-100"> {m.genere}</span>
                      </h2>
                      <h2>
                        Release Date:
                        <span className=" text-gray-100"> {m.release}</span>
                      </h2>
                      <h2>
                        Run Time:{" "}
                        <span className=" text-gray-100"> {m.runtime}</span>
                      </h2>
                      <h2 className="flex items-center gap-2">
                        Rate:
                        <span className="text-orange-400 text-sm flex items-center gap-1">
                          <BsStarFill />
                          {m.rate}/10
                        </span>
                      </h2>
                    </div>
                    <div className="w-32 text-white text-sm bg-slate-600 hover:bg-slate-700 transition-all duration-500 h-10 mt-4 rounded-lg flex justify-center items-center gap-2">
                      Watch Now
                      <span className="inline-flex items-center justify-center w-7 h-7 text-2xl">
                        <BsPlayCircle />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>something went wrong.</p> // Handle case where slicemovie[1] doesn't exist
          )}
        </section>
        <div className="w-full flex justify-between text-white mt-5">
          <button
            onClick={onPrevousButton}
            className="bg-slate-500 px-3 py-1 rounded-sm"
          >
            Prevous
          </button>
          <div className="flex gap-2">
            {btnPage.slice(btns, btne).map((index) => (
              <Link
                to={`/tv-show/page/${index}`}
                key={index}
                className={`w-7 h-7 flex justify-center items-center rounded-full text-sm ${
                  index == parseInt(pageId) ? "bg-orange-500" : "bg-slate-500"
                }`}
              >
                {index}
              </Link>
            ))}
          </div>
          <button
            onClick={() => onNextButton()}
            className=" bg-slate-500 px-3 py-1 rounded-sm"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default TvShow;
