import React, { useEffect, useState } from "react";
import { useMovieContext } from "../../Context";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { set } from "mongoose";

const Table = () => {
  const { movies, fetchMovies, deleteMovie, success } = useMovieContext();
  const [deleteid, setDeleteId] = useState(null);
  const [flipMovies, setFlipMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [slice, setSlice] = useState(20);
  const [search, setSearch] = useState("");

  const handleSlice = (e) => {
    setSlice(e.target.value);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filter = flipMovies.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchFilter(filter);
  };

  useEffect(() => {
    fetchMovies();
    if (movies) {
      const flip = movies.reverse();
      setFlipMovies(flip);
      setFilterMovies(flip);
    }
  }, [fetchMovies]);

  const handleDelete = (_id) => {
    deleteMovie(_id);
    if (success) {
    }
    setDeleteId();
  };

  const onCartoon = (e) => {
    const filter = flipMovies.filter((movie) =>
      movie.genere.toLowerCase().includes(e.target.value)
    );
    setSearch(filter);
  };

  return (
    <div className="mt-4 max-w-full overflow-x-clip">
      <div className="mt-8">
        <div className="mt-6 flex justify-between">
          <h3 className="text-gray-500 text-3xl font-medium">Tables</h3>
          <div className="mt-3 flex flex-col sm:flex-row">
            <div className="flex">
              <div className="relative">
                <select
                  onChange={handleSlice}
                  className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value={movies.length}>all</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  onChange={onCartoon}
                  className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                >
                  <option value={""}>All</option>
                  <option value={"cartoon"}>Cartoon</option>
                  <option value={"action"}>Action</option>
                  <option value={"sci-fi"}>Sci-fi</option>
                  <option value={"horror"}>Horror</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="block relative mt-2 sm:mt-0 md:min-w-[600px]">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>

              <input
                value={search}
                onChange={handleSearch}
                placeholder="Search"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col mt-6">
          <div className="py-2">
            <div className="max-w-full overflow-hidden sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Imdb
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Genere
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Cover
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Runtime
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Release Year
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Trending
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {search === ""
                    ? filterMovies
                        .slice(0, slice)
                        .map(
                          ({
                            _id,
                            name,
                            img,
                            rate,
                            release,
                            genere,
                            runtime,
                            type,
                            cover,
                            trending,
                            source,
                            detail,
                          }) => (
                            <tr key={_id} className="border-b border-gray-200">
                              <td className="px-6 py-4 whitespace-no-wrap w-1/4">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                      className="h-10 w-10 overflow-hidden"
                                      src={img}
                                      alt=""
                                    />
                                  </div>

                                  <div className="ml-4">
                                    <div className="text-sm leading-5 font-medium text-gray-900">
                                      {name}
                                    </div>
                                    <div className="text-sm leading-5 text-gray-500">
                                      {detail?.slice(0, 30) + "..."}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap gap-2 min-h-full">
                                <div className="flex gap-2 items-center">
                                  <div className="text-sm leading-5 text-gray-900">
                                    {rate}
                                  </div>
                                  <div className="text-sm leading-5 text-gray-500 flex items-center">
                                    <BsStarFill />
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {genere}
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {type}
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                <div className="w-14 h-8 ">
                                  <img src={cover} alt="" />
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                <div className="w-14 h-8 ">{runtime}mn</div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                <div className="w-14 h-8 ">{release}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {trending ? "Yes" : "No"}
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium space-x-3">
                                <Link
                                  to={`/admin/update_movie/${_id}`}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={() => setDeleteId(_id)}
                                  className="text-red-600 hover:text-indigo-900"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          )
                        )
                    : searchFilter
                        .slice(0, slice)
                        .map(
                          ({
                            _id,
                            name,
                            img,
                            rate,
                            release,
                            genere,
                            runtime,
                            type,
                            cover,
                            trending,
                            source,
                            detail,
                          }) => (
                            <tr key={_id} className="border-b border-gray-200">
                              <td className="px-6 py-4 whitespace-no-wrap w-1/4">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                      className="h-10 w-10 overflow-hidden"
                                      src={img}
                                      alt=""
                                    />
                                  </div>

                                  <div className="ml-4">
                                    <div className="text-sm leading-5 font-medium text-gray-900">
                                      {name}
                                    </div>
                                    <div className="text-sm leading-5 text-gray-500">
                                      {detail?.slice(0, 30) + "..."}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap gap-2 min-h-full">
                                <div className="flex gap-2 items-center">
                                  <div className="text-sm leading-5 text-gray-900">
                                    {rate}
                                  </div>
                                  <div className="text-sm leading-5 text-gray-500 flex items-center">
                                    <BsStarFill />
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {genere}
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {type}
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                <div className="w-14 h-8 ">
                                  <img src={cover} alt="" />
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                <div className="w-14 h-8 ">{runtime}mn</div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                <div className="w-14 h-8 ">{release}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {trending ? "Yes" : "No"}
                              </td>

                              <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium space-x-3">
                                <Link
                                  to={`/admin/update_movie/${_id}`}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={() => setDeleteId(_id)}
                                  className="text-red-600 hover:text-indigo-900"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <section
        className={`w-full h-screen fixed top-0 left-0 ${
          deleteid ? "block" : "hidden"
        }`}
      >
        <div className="bg-slate-500 rounded-2xl p-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[370px]">
          <p className="text-center text-white">
            Do you really want to delete
            <br />
            <span className="font-bold">
              {movies.find((movie) => movie._id == deleteid)?.name}
            </span>
          </p>
          <div className="mt-5 flex justify-between text-white">
            <button
              className="bg-yellow-400 px-3 py-1 rounded-lg"
              onClick={() => setDeleteId()}
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(deleteid)}
              className=" bg-red-600 px-3 py-1 rounded-lg"
            >
              yes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Table;
