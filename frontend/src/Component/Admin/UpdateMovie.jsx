import React, { useEffect, useState } from "react";
import { useMovieContext } from "../../Context";
import { Link, useParams } from "react-router-dom";

const UpdateMovie = () => {
  const [subwarning, setSubwarning] = useState(false);
  const { id } = useParams();
  const { fetchMovies, movies, updateMovie, success, message } =
    useMovieContext();

  const [updatedMovie, setUpdatedMovie] = useState({
    name: "",
    img: "",
    rate: 0,
    cover: "",
    type: "",
    genere: "",
    runtime: "",
    release: "",
    trending: false,
    detail: "",
    source: "",
  });

  const onCancel = () => {
    setUpdatedMovie({
      name: "",
      img: "",
      rate: 0,
      cover: "",
      type: "",
      genere: "",
      runtime: "",
      release: "",
      trending: false,
      detail: "",
      source: "",
    });
  };

  useEffect(() => {
    fetchMovies();
    if (movies) {
      const movie = movies.find((movie) => movie._id === id);
      if (movie) {
        setUpdatedMovie(movie);
      }
    }
  }, [fetchMovies]);

  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    const result = await updateMovie(updatedMovie);
    setSubwarning(true);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      {/* Add form  */}
      <section className={`w-full bg-opacity-40 pt-10`}>
        <form className="p-3 w-full h-full rounded-xl lg:max-w-[1200px]">
          <h1 className="text-3xl text-gray-400 font-semibol">Update movie</h1>
          <div className="grid grid-cols-1 md:grid-cols-12 mt-12">
            <label className="col-span-1 " htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className={`col-span-11 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !updatedMovie.name
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="name"
              name="name"
              value={updatedMovie.name}
              onChange={(e) =>
                setUpdatedMovie({ ...updatedMovie, name: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 mt-3">
            <label className="col-span-1 " htmlFor="img">
              Poster
            </label>
            <input
              type="text"
              className={`col-span-11 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !updatedMovie.img
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="poster url"
              name="img"
              value={updatedMovie.img}
              onChange={(e) =>
                setUpdatedMovie({ ...updatedMovie, img: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 mt-3">
            <label className="col-span-1 " htmlFor="cover">
              Cover
            </label>
            <input
              type="text"
              className={`col-span-11 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !updatedMovie.cover
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="cover url"
              name="cover"
              value={updatedMovie.cover}
              onChange={(e) =>
                setUpdatedMovie({ ...updatedMovie, cover: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 mt-3">
            <label className="col-span-1 " htmlFor="rate">
              Rate
            </label>
            <input
              type="number"
              className={`col-span-11 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !updatedMovie.rate
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="rate"
              name="rate"
              value={updatedMovie.rate}
              onChange={(e) =>
                setUpdatedMovie({ ...updatedMovie, rate: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 mt-3">
            <label className="col-span-1 " htmlFor="runtime">
              Runtime
            </label>
            <input
              type="number"
              className={`col-span-11 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !updatedMovie.runtime
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="runtime"
              name="runtime"
              value={updatedMovie.runtime}
              onChange={(e) =>
                setUpdatedMovie({ ...updatedMovie, runtime: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 mt-3">
            <label className="col-span-1 " htmlFor="rate">
              Genere
            </label>
            <select
              className={`w-full col-span-11 outline-none ${
                subwarning && !updatedMovie.genere
                  ? "text-red-600"
                  : "text-black"
              }`}
              name="genere"
              id="genere"
              value={updatedMovie.genere}
              onChange={(e) =>
                setUpdatedMovie({ ...updatedMovie, genere: e.target.value })
              }
            >
              <option className="text-black" value="action">
                action
              </option>
              <option className="text-black" value="cartoon">
                cartoon
              </option>
              <option className="text-black" value="romance">
                romance
              </option>
              <option className="text-black" value="sc-fi">
                sc-fi
              </option>
              <option className="text-black" value="horror">
                horror
              </option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 mt-3">
            <label className="col-span-1 " htmlFor="rate">
              Type
            </label>
            <div
              className="col-span-11 flex gap-5
            "
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={updatedMovie.type === "movie" ? true : false}
                  className="rounded-full px-2 py-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  name="type"
                  value={"movie"}
                  onChange={(e) =>
                    setUpdatedMovie({ ...updatedMovie, type: e.target.value })
                  }
                  required
                />
                <label className="col-span-1 " htmlFor="type">
                  movie
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={updatedMovie.type === "tv-show" ? true : false}
                  className=" rounded-full px-2 py-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  name="type"
                  value="tv-show"
                  onChange={(e) =>
                    setUpdatedMovie({ ...updatedMovie, type: e.target.value })
                  }
                  required
                />
                <label className="col-span-1 " htmlFor="type">
                  tv-show
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 mt-3">
            <label className="col-span-1" htmlFor="rate">
              Trending
            </label>
            <div className="col-span-11 flex gap-5">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={updatedMovie.trending === true ? true : false}
                  className="rounded-full px-2 py-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  name="trending"
                  onChange={(e) =>
                    setUpdatedMovie({
                      ...updatedMovie,
                      trending: true, // Convert to boolean
                    })
                  }
                />
                <label htmlFor="trending">Trending</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={updatedMovie.trending === false ? true : false}
                  className="rounded-full px-2 py-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  name="trending"
                  onChange={(e) =>
                    setUpdatedMovie({
                      ...updatedMovie,
                      trending: false,
                    })
                  }
                />
                <label htmlFor="trending">Not Trending</label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 mt-3">
            <label className="col-span-1 " htmlFor="release">
              Release year
            </label>
            <input
              type="text"
              className={`col-span-11 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !updatedMovie.release
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="release year"
              name="release"
              value={updatedMovie.release}
              onChange={(e) =>
                setUpdatedMovie({ ...updatedMovie, release: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 mt-3">
            <label className="col-span-1 " htmlFor="detail">
              Plot
            </label>
            <textarea
              type="text"
              className={`col-span-11 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !updatedMovie.detail
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="plot"
              rows="4"
              cols="5"
              name="detail"
              value={updatedMovie.detail}
              onChange={(e) =>
                setUpdatedMovie({ ...updatedMovie, detail: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 mt-3">
            <label className="col-span-1 " htmlFor="source">
              Source
            </label>
            <input
              type="text"
              className={`col-span-11 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !updatedMovie.source
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="source url"
              name="source"
              value={updatedMovie.source}
              onChange={(e) =>
                setUpdatedMovie({ ...updatedMovie, source: e.target.value })
              }
              required
            />
          </div>
          <div className="flex gap-8 mt-12">
            <Link
              to={`/admin`}
              className="w-24 h-10 flex items-center justify-center rounded-md bg-red-400 font-bold text-black"
              onClick={onCancel}
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={handleUpdateMovie}
              className="w-24 h-10 flex items-center justify-center rounded-md bg-green-400 font-bold text-black"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateMovie;
