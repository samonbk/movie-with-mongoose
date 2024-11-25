import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";

const DashBoard = () => {
  const { user, logged } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [typemovie, setTypemove] = useState([]);
  const [typetvshow, setTypetvshow] = useState([]);
  const [generescifi, setGenerescifi] = useState([]);
  const [generecartoon, setGenerecartoon] = useState([]);
  const [generedrama, setGeneredrama] = useState([]);
  const [genereaction, setGenereaction] = useState([]);
  const [generehorror, setGenerehorror] = useState([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [rate, setRate] = useState(0);
  const [cover, setCover] = useState("");
  const [type, setType] = useState("");
  const [genere, setGenere] = useState("");
  const [runtime, setRuntime] = useState("");
  const [release, setRelease] = useState("");
  const [trending, setTrending] = useState(false);
  const [detail, setDetail] = useState("");
  const [source, setSource] = useState("");

  const [updatename, setUpdateName] = useState("");
  const [updateimg, setUpdateImg] = useState("");
  const [updaterate, setUpdateRate] = useState();
  const [updatecover, setUpdateCover] = useState("");
  const [updatetype, setUpdateType] = useState("");
  const [updategenere, setUpdateGenere] = useState("");
  const [updateruntime, setUpdateRuntime] = useState("");
  const [updaterelease, setUpdateRelease] = useState("");
  const [updatetrending, setUpdateTrending] = useState(false);
  const [updatedetail, setUpdateDetail] = useState("");
  const [updatesource, setUpdateSource] = useState("");

  const [showadd, setShowadd] = useState(false);
  const [updateobj, setUpdateObj] = useState(false);
  const [deleteid, setDeleteId] = useState();
  const [updateid, setUpdateId] = useState();
  const [subwarning, setSubwarning] = useState(false);

  useEffect(() => {
    if (!user || !logged) {
      navigate("/login");
    }
  }, [location, logged]);

  // Fetch get data from api
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

    const typetv = movie.filter((movie) => movie.type === "tv-show").length;
    const typem = movie.filter((movie) => movie.type === "movie").length;
    setTypemove(typem);
    setTypetvshow(typetv);
    const scifi = movie.filter((movie) =>
      movie.genere.toLowerCase().includes("sci-fi")
    ).length;
    setGenerescifi(scifi);
    const cartoon = movie.filter((movie) =>
      movie.genere.toLowerCase().includes("cartoon")
    ).length;
    setGenerecartoon(cartoon);
    const drama = movie.filter((movie) =>
      movie.genere.toLowerCase().includes("drama")
    ).length;
    setGeneredrama(drama);
    const action = movie.filter((movie) =>
      movie.genere.toLowerCase().includes("action")
    ).length;
    setGenereaction(action);
    const horror = movie.filter((movie) =>
      movie.genere.toLowerCase().includes("horror")
    ).length;
    setGenerehorror(horror);
  }, [movie]);

  // Handle Delete
  const handleDelete = (id) => {
    const deletemovie = movie.find((movie) => movie.id === id)?.name;
    fetch(`http://localhost:3000/moviedata/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setDeleteId();
          alert(deletemovie + " is deleted");
        } else {
          console.error("Failed to delete movie");
          console.log(response);
        }
      })
      .catch((error) => console.error("Error deleting movie:", error));
  };

  // Adding submit
  // async
  function handleAddSubmit(e) {
    e.preventDefault();
    const lastIndex = movie.length - 1;
    const newId = lastIndex >= 0 ? parseInt(movie[lastIndex].id) + 1 : 1;
    const newRuntime = runtime.toString() + "mn";
    const newmovieObj = {
      id: newId.toString(),
      name,
      img,
      cover,
      rate,
      type,
      runtime: newRuntime,
      release,
      genere,
      detail,
      trending,
      source,
    };
    setSubwarning(true);
    if (
      newmovieObj.name != "" &&
      newmovieObj.img != "" &&
      newmovieObj.cover != "" &&
      newmovieObj.rate != null &&
      newmovieObj.runtime != "" &&
      newmovieObj.genere != "" &&
      newmovieObj.type != "" &&
      newmovieObj.release != "" &&
      newmovieObj.detail != "" &&
      newmovieObj.source != ""
    )
      // try {
      //   const response = await fetch("http://localhost:3000/moviedata", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(newmovieObj),
      //   });

      //   if (!response.ok) {
      //     throw new Error("Failed to submit the form");
      //   }

      //   const result = await response.json();
      //   console.log("Form submitted successfully:", result);
      //   alert(newmovieObj.name + " is added");
      //   handleCancelAdd();
      // } catch (error) {
      //   console.error("Error:", error);
      // }
      axios
        .post("http://localhost:3000/moviedata", newmovieObj)
        .then((response) => {
          console.log("Movie added successfully:", response.data);
          // Optionally, reset the form or give feedback to the user
          // setMovie({ name: "", director: "", genre: "", year: "" });
          alert(newmovieObj.name + " is added");
          handleCancelAdd();
        })
        .catch((error) => {
          console.error("There was an error adding the movie:", error);
        });
  }

  //Cancel Adding
  function handleCancelAdd() {
    setName("");
    setImg("");
    setCover("");
    setRate(0);
    setRuntime("");
    setRelease(2000);
    setGenere("");
    setDetail("");
    setTrending(false);
    setSource("");
    setShowadd(false);
    setSubwarning(false);
  }

  // Add to trending
  function handleAddTrending(id) {
    const newTrending = movie.find((movie) => movie.id == id)?.trending;
    const updatedMovie = { trending: !newTrending };

    fetch(`http://localhost:3000/moviedata/${id}`, {
      method: "PATCH", // Use PATCH to update a specific property
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update trending status");
        }
        return response.json();
      })
      .then((updatedData) => {
        // Update the local state with the updated movie
        setMovie((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === id ? { ...movie, ...updatedData } : movie
          )
        );
      })
      .catch((error) => console.error("Error updating movie trending:", error));
  }

  // Show update form
  function handleShowUpdate(id) {
    setUpdateId(id);
    const update = movie.find((movie) => movie.id === id);
    console.log(update);
    if (update) {
      setUpdateName(update.name);
      setUpdateImg(update.img);
      setUpdateCover(update.cover);
      setUpdateRate(update.rate);
      setUpdateGenere(update.genere);
      setUpdateRelease(update.release);
      setUpdateRuntime(update.runtime);
      setUpdateType(update.type);
      setUpdateDetail(update.detail);
      setUpdateSource(update.source);
    }
  }

  // Cancelling update
  function handleCancelUpdate() {
    setUpdateName("");
    setUpdateImg("");
    setUpdateCover("");
    setUpdateRate("");
    setUpdateGenere("");
    setUpdateRelease("");
    setUpdateRuntime("");
    setUpdateType("");
    setUpdateDetail("");
    setUpdateSource("");
    setUpdateId("");
  }

  // Handle submit update
  function handleUpdate(id) {
    const newobj = {
      name: updatename,
      img: updateimg,
      cover: updatecover,
      rate: updaterate,
      genere: updategenere,
      release: updaterelease,
      runtime: updateruntime,
      type: updatetype,
      detail: updatedetail,
      source: updatesource,
    };

    fetch(`http://localhost:3000/moviedata/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newobj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update movie details");
        }
        return response.json();
      })
      .then((updatedData) => {
        // Update the local state with the updated movie
        setMovie((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === id ? { ...movie, ...updatedData } : movie
          )
        );
        alert(updatedData.name + " is updated");
        handleCancelUpdate();
      })
      .catch((error) => console.error("Error updating movie details:", error));
  }

  return (
    <>
      <div className="max-w-[1570px] m-auto px-2 overflow-x-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-lg mt-4">Dashboard</h1>
        </div>
        <div className="mt-4 grid md:grid-cols-4 grid-cols-2 gap-10">
          <div className="rounded-xl bg-gray-500 h-[150px] flex flex-col gap-3 items-center justify-center">
            <h3 className="text-3xl">All</h3>
            <span className="text-5xl">{movie.length}</span>
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
        <div className="flex justify-between mt-6">
          <h2>Movie List</h2>
          <button
            className="bg-slate-600 rounded-md flex items-center px-2 h-8"
            onClick={() => setShowadd(true)}
          >
            <BiPlus /> <span>Add</span>
          </button>
        </div>

        {/* Render  */}
        <div className="max-w-[1570px] m-autooverflow-x-auto">
          <div className="mt-4 min-w-[1000px]">
            <div className="grid grid-cols-12 p-2 bg-slate-900">
              <div className="col-span-1 flex items-center">Poster</div>
              <div className="col-span-4 flex items-center">
                <h2>Name</h2>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <span>Genere</span>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <span>Run time</span>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <span>Rate</span>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <span>Type</span>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <span>Trending</span>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <span>Release year</span>
              </div>
              <div className="col-span-1 flex justify-end"></div>
            </div>
            {movie.map(
              ({
                id,
                img,
                name,
                genere,
                rate,
                release,
                runtime,
                type,
                trending,
              }) => (
                <div key={id} className="grid grid-cols-12 bg-slate-900 mt-2">
                  <div className="col-span-1 ">
                    <img className="max-w-[70px]" src={img} alt={name} />
                  </div>
                  <div className="col-span-4 ">
                    <h2>{name}</h2>
                  </div>
                  <div className="col-span-1 text-right">
                    <span>{genere}</span>
                  </div>
                  <div className="col-span-1 text-right">
                    <span>{runtime}</span>
                  </div>
                  <div className="col-span-1 text-right">
                    <span>{rate}/10</span>
                  </div>
                  <div className="col-span-1 text-right">
                    <span>{type}</span>
                  </div>
                  <div className="col-span-1 text-center pl-8">
                    <span>{trending ? "trening" : "not"}</span>
                  </div>
                  <div className="col-span-1 text-right">
                    <span>{release}</span>
                  </div>
                  <div className="col-span-1 flex justify-end items-start text-2xl">
                    <div className=" relative group">
                      <BsThreeDots />
                      <div className="absolute -right-2 top-5 hidden group-hover:block text-xs rounded-md overflow-hidden bg-slate-700 w-[150px] text-right z-40">
                        <button
                          className="hover:bg-slate-600 p-3 w-full text-right"
                          onClick={() => handleAddTrending(id)}
                        >
                          {trending ? "Remove from trend" : "Add to trend"}
                        </button>
                        <button
                          className="hover:bg-slate-600 p-3 w-full text-right"
                          onClick={() => setDeleteId(id)}
                        >
                          Delete
                        </button>
                        <button
                          className="hover:bg-slate-600 p-3 w-full text-right"
                          onClick={() => handleShowUpdate(id)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Delete Section */}
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
                {movie.find((movie) => movie.id == deleteid)?.name}
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

        {/* Add form  */}
        <section
          className={`w-screen h-screen bg-black bg-opacity-40 fixed top-0 left-0 z-50 ${
            showadd ? "block" : "hidden"
          }`}
        >
          <form
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 md:px-24 bg-gray-700 rounded-xl"
            action=""
          >
            <h1 className="text-center text-3xl font-semibold">
              Add new movie
            </h1>
            <div className="grid grid-cols-12 mt-12">
              <label className="col-span-4 " htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className={`col-span-8 focus:outline-none text-black rounded-md px-2 py-1 ${
                  subwarning && !name
                    ? "placeholder:text-red-600"
                    : "placeholder:text-gray-500"
                }`}
                placeholder="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="img">
                Poster
              </label>
              <input
                type="text"
                className={`col-span-8 focus:outline-none text-black rounded-md px-2 py-1 ${
                  subwarning && !img
                    ? "placeholder:text-red-600"
                    : "placeholder:text-gray-500"
                }`}
                placeholder="poster url"
                name="img"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="cover">
                Cover
              </label>
              <input
                type="text"
                className={`col-span-8 focus:outline-none text-black rounded-md px-2 py-1 ${
                  subwarning && !cover
                    ? "placeholder:text-red-600"
                    : "placeholder:text-gray-500"
                }`}
                placeholder="cover url"
                name="cover"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="rate">
                Rate
              </label>
              <input
                type="number"
                className={`col-span-8 focus:outline-none text-black rounded-md px-2 py-1 ${
                  subwarning && !rate
                    ? "placeholder:text-red-600"
                    : "placeholder:text-gray-500"
                }`}
                placeholder="rate"
                name="rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="runtime">
                Runtime
              </label>
              <input
                type="number"
                className={`col-span-8 focus:outline-none text-black rounded-md px-2 py-1 ${
                  subwarning && !runtime
                    ? "placeholder:text-red-600"
                    : "placeholder:text-gray-500"
                }`}
                placeholder="runtime"
                name="runtime"
                value={runtime}
                onChange={(e) => setRuntime(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="rate">
                Genere
              </label>
              <select
                className={`w-full col-span-8 outline-none ${
                  subwarning && !genere ? "text-red-600" : "text-black"
                }`}
                value={genere}
                name="genere"
                id="genere"
                onChange={(e) => setGenere(e.target.value)}
              >
                <option className="text-black" value="action">
                  action
                </option>
                <option className="text-black" value="cartton">
                  cartton
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
              <label className="col-span-4 " htmlFor="rate">
                Type
              </label>
              <div
                className="col-span-8 flex gap-5
            "
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    className="rounded-full px-2 py-1 w-6 h-6 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    name="type"
                    value="movie"
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                  <label className="col-span-4 " htmlFor="type">
                    movie
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    className=" rounded-full px-2 py-1 w-6 h-6 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    name="type"
                    value="tv-show"
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                  <label className="col-span-4 " htmlFor="type">
                    tv-show
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="release">
                Release year
              </label>
              <input
                type="text"
                className={`col-span-8 focus:outline-none text-black rounded-md px-2 py-1 ${
                  subwarning && !release
                    ? "placeholder:text-red-600"
                    : "placeholder:text-gray-500"
                }`}
                placeholder="release year"
                name="release"
                value={release}
                onChange={(e) => setRelease(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="detail">
                Plot
              </label>
              <input
                type="text"
                className={`col-span-8 focus:outline-none text-black rounded-md px-2 py-1 ${
                  subwarning && !detail
                    ? "placeholder:text-red-600"
                    : "placeholder:text-gray-500"
                }`}
                placeholder="plot"
                name="detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="source">
                Source
              </label>
              <input
                type="text"
                className={`col-span-8 focus:outline-none text-black rounded-md px-2 py-1 ${
                  subwarning && !source
                    ? "placeholder:text-red-600"
                    : "placeholder:text-gray-500"
                }`}
                placeholder="source url"
                name="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-8 w-ful justify-between mt-12">
              <button
                type="button"
                className="w-24 h-10 flex items-center justify-center rounded-md bg-red-400 font-bold text-black"
                onClick={() => handleCancelAdd()}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleAddSubmit}
                className="w-24 h-10 flex items-center justify-center rounded-md bg-green-400 font-bold text-black"
              >
                Submit
              </button>
            </div>
          </form>
        </section>

        {/* Update Section  */}
        <section
          className={`w-screen h-screen bg-black bg-opacity-40 fixed top-0 left-0 z-50 ${
            updateid ? "block" : "hidden"
          }`}
        >
          <form
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-16 bg-gray-700 rounded-xl"
            action=""
          >
            <h1 className="text-center text-3xl font-semibold">Update</h1>
            <div className="grid grid-cols-12 mt-12">
              <label className="col-span-4 " htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="col-span-8 focus:outline-none text-black rounded-md px-2 py-1"
                placeholder="name"
                name="name"
                value={updatename}
                onChange={(e) => setUpdateName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="poster">
                Poster
              </label>
              <input
                type="text"
                className="col-span-8 focus:outline-none text-black rounded-md px-2 py-1"
                placeholder="poster url"
                name="img"
                value={updateimg}
                onChange={(e) => setUpdateImg(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="poster">
                Cover
              </label>
              <input
                type="text"
                className="col-span-8 focus:outline-none text-black rounded-md px-2 py-1"
                placeholder="cover url"
                name="cover"
                value={updatecover}
                onChange={(e) => setUpdateCover(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="rate">
                Rate
              </label>
              <input
                type="number"
                className="col-span-8 focus:outline-none text-black rounded-md px-2 py-1"
                placeholder="rate"
                name="rate"
                value={updaterate}
                onChange={(e) => setUpdateRate(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-12 mt-3 ">
              <label className="col-span-4 " htmlFor="genere">
                Genere
              </label>
              <select
                className={`w-full col-span-8 outline-none text-black h-8 rounded-md`}
                value={updategenere}
                name="updategenere"
                id="genere"
                onChange={(e) => setUpdateGenere(e.target.value)}
              >
                <option value="action">action</option>
                <option value="cartton">cartton</option>
                <option value="romance">romance</option>
                <option value="sc-fi">sc-fi</option>
                <option value="horror">horror</option>
              </select>
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="rate">
                Type
              </label>
              <div
                className="col-span-8 flex gap-5
            "
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    className="rounded-full px-2 py-1 w-6 h-6 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    name="type"
                    value={"movie"}
                    onChange={(e) => setUpdateType(e.target.value)}
                    checked={updatetype === "movie"}
                  />
                  <label className="col-span-4 " htmlFor="type">
                    movie
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    className="rounded-full px-2 py-1 w-6 h-6 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    name="type"
                    value={"tv-show"}
                    onChange={(e) => setUpdateType(e.target.value)}
                    checked={updatetype === "tv-show"}
                  />
                  <label className="col-span-4 " htmlFor="type">
                    tv-show
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="release">
                Release year
              </label>
              <input
                type="text"
                className="col-span-8 focus:outline-none text-black rounded-md px-2 py-1"
                placeholder="release year"
                name="release"
                value={updaterelease}
                onChange={(e) => setUpdateRelease(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="detail">
                Plot
              </label>
              <input
                type="text"
                className="col-span-8 focus:outline-none text-black rounded-md px-2 py-1"
                placeholder="plot"
                name="detail"
                value={updatedetail}
                onChange={(e) => setUpdateDetail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-12 mt-3">
              <label className="col-span-4 " htmlFor="source">
                Source
              </label>
              <input
                type="text"
                className="col-span-8 focus:outline-none text-black rounded-md px-2 py-1"
                placeholder="source url"
                name="source"
                value={updatesource}
                onChange={(e) => setUpdateSource(e.target.value)}
              />
            </div>
            <div className="flex gap-8 w-ful justify-between mt-12">
              <button
                type="button"
                className="w-24 h-10 flex items-center justify-center rounded-md bg-red-400 font-bold text-black"
                onClick={() => handleCancelUpdate()}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleUpdate(updateid)}
                className="w-24 h-10 flex items-center justify-center rounded-md bg-green-400 font-bold text-black"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default DashBoard;
