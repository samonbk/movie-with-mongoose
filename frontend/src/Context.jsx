import React, { createContext, useContext, useEffect, useState } from "react";
import { create } from "zustand";

const GlobaleContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobaleContext); // Return the context value
};

const Context = ({ children }) => {
  const [user, setUser] = useState({});
  const [account, setAccount] = useState([]);
  const [logged, setLogged] = useState(false);
  const [moviedata, setMoviedata] = useState([]);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    fetch("https://samon-movieforkh-api.vercel.app")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else return response.json();
      })
      .then((data) => {
        setAccount(data.account);
        setMoviedata(data.moviedata);
        setIsloading(false);
      })
      .catch((error) =>
        console.error(
          "There has been a problem with your fetch operation:",
          error
        )
      );
  }, [moviedata]); // Empty dependency array to run effect only on mount

  useEffect(() => {
    const value = localStorage.getItem("movieforkhusernamekey");
    if (value) {
      setUser({ username: value });
      setLogged(true);
      console.log(value);
    } else {
      localStorage.setItem("movieforkhusernamekey", "");
    }
  }, []);

  function signOut() {
    setLogged(false);
    setUser();
    localStorage.setItem("movieforkhusernamekey", "");
  }

  function setnewuser(newusername) {
    setUser(newusername);
    setLogged(true);
  }

  return (
    <GlobaleContext.Provider
      value={{
        user,
        logged,
        account,
        moviedata,
        isloading,
        signOut,
        setnewuser,
      }}
    >
      {children}
    </GlobaleContext.Provider>
  );
};

export default Context;

export const useMovieContext = create((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
  fetchMovies: async () => {
    try {
      const apiUrl = "http://localhost:5000";

      const res = await fetch(apiUrl + "/api/movies");

      if (!res.ok) {
        throw new Error(
          `Failed to fetch movies: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      set({ movies: data.data });
    } catch (error) {
      console.error("Error fetching movies:", error);
      set({ movies: [] });
    }
  },
}));
