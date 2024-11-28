import React, { useState } from "react";
import { useMovieContext } from "../../Context";

const AddMovie = () => {
  const [subwarning, setSubwarning] = useState(false);

  const { createMovie, success, message } = useMovieContext();
  const [newMovie, setNewMovie] = useState({
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
    setNewMovie({
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

  const handleAddMovie = async (e) => {
    e.preventDefault();
    setSubwarning(true);
    const result = await createMovie(newMovie);

    if (result.success) {
      onCancel();
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      {/* Add form  */}
      <section className={`w-full pt-10`}>
        <form className="p-3 w-full h-full rounded-xl lg:max-w-[1200px]">
          <h1 className="text-3xl text-gray-400 font-semibol">Add new movie</h1>
          <div className="grid grid-cols-12 mt-12">
            <label className="col-span-2 " htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className={`col-span-10 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !newMovie.name
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="name"
              name="name"
              value={newMovie.name}
              onChange={(e) =>
                setNewMovie({ ...newMovie, name: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-12 mt-3">
            <label className="col-span-2 " htmlFor="img">
              Poster
            </label>
            <input
              type="text"
              className={`col-span-10 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !newMovie.img
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="poster url"
              name="img"
              value={newMovie.img}
              onChange={(e) =>
                setNewMovie({ ...newMovie, img: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-12 mt-3">
            <label className="col-span-2 " htmlFor="cover">
              Cover
            </label>
            <input
              type="text"
              className={`col-span-10 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !newMovie.cover
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="cover url"
              name="cover"
              value={newMovie.cover}
              onChange={(e) =>
                setNewMovie({ ...newMovie, cover: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-12 mt-3">
            <label className="col-span-2 " htmlFor="rate">
              Rate
            </label>
            <input
              type="number"
              className={`col-span-10 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !newMovie.rate
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="rate"
              name="rate"
              value={newMovie.rate}
              onChange={(e) =>
                setNewMovie({ ...newMovie, rate: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-12 mt-3">
            <label className="col-span-2 " htmlFor="runtime">
              Runtime
            </label>
            <input
              type="number"
              className={`col-span-10 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !newMovie.runtime
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="runtime"
              name="runtime"
              value={newMovie.runtime}
              onChange={(e) =>
                setNewMovie({ ...newMovie, runtime: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-12 mt-3">
            <label className="col-span-2 " htmlFor="rate">
              Genere
            </label>
            <select
              className={`w-full col-span-10 outline-none ${
                subwarning && !newMovie.genere ? "text-red-600" : "text-black"
              }`}
              name="genere"
              id="genere"
              value={newMovie.genere}
              onChange={(e) =>
                setNewMovie({ ...newMovie, genere: e.target.value })
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
          <div className="grid grid-cols-12 mt-3">
            <label className="col-span-2 " htmlFor="rate">
              Type
            </label>
            <div
              className="col-span-10 flex gap-5
            "
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="rounded-full px-2 py-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  name="type"
                  value="movie"
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, type: e.target.value })
                  }
                  required
                />
                <label className="col-span-2 " htmlFor="type">
                  movie
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className=" rounded-full px-2 py-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  name="type"
                  value="tv-show"
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, type: e.target.value })
                  }
                  required
                />
                <label className="col-span-2 " htmlFor="type">
                  tv-show
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 mt-3">
            <label className="col-span-2" htmlFor="rate">
              Trending
            </label>
            <div className="col-span-10 flex gap-5">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={newMovie.trending === true ? true : false}
                  className="rounded-full px-2 py-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  name="trending"
                  onChange={(e) =>
                    setNewMovie({
                      ...newMovie,
                      trending: true, // Convert to boolean
                    })
                  }
                />
                <label htmlFor="trending">Trending</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={newMovie.trending === false ? true : false}
                  className="rounded-full px-2 py-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  name="trending"
                  onChange={(e) =>
                    setNewMovie({
                      ...newMovie,
                      trending: false,
                    })
                  }
                />
                <label htmlFor="trending">Not Trending</label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 mt-3">
            <label className="col-span-2 " htmlFor="release">
              Release year
            </label>
            <input
              type="text"
              className={`col-span-10 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !newMovie.release
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="release year"
              name="release"
              value={newMovie.release}
              onChange={(e) =>
                setNewMovie({ ...newMovie, release: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-12 mt-3">
            <label className="col-span-2 " htmlFor="detail">
              Plot
            </label>
            <textarea
              type="text"
              className={`col-span-10 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !newMovie.detail
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              rows="4"
              cols="50"
              placeholder="plot"
              name="detail"
              value={newMovie.detail}
              onChange={(e) =>
                setNewMovie({ ...newMovie, detail: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-12 mt-3">
            <label className="col-span-2 " htmlFor="source">
              Source
            </label>
            <input
              type="text"
              className={`col-span-10 focus:outline-none text-black rounded-md px-2 py-1 ${
                subwarning && !newMovie.source
                  ? "placeholder:text-red-600"
                  : "placeholder:text-gray-500"
              }`}
              placeholder="source url"
              name="source"
              value={newMovie.source}
              onChange={(e) =>
                setNewMovie({ ...newMovie, source: e.target.value })
              }
              required
            />
          </div>
          <div className="flex gap-8 mt-12">
            <button
              type="button"
              className="w-24 h-10 flex items-center justify-center rounded-md bg-red-400 font-bold text-black"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddMovie}
              className="w-24 h-10 flex items-center justify-center rounded-md bg-green-400 font-bold text-black"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddMovie;
