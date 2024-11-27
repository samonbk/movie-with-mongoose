import React, { createContext, useContext, useEffect, useState } from "react";
import { create } from "zustand";

const GlobaleContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobaleContext); // Return the context value
};

const Context = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    img: "",
    password: "",
    role: "",
    phone: "",
    dob: "",
    bio: "",
  });
  const [accounts, setAccounts] = useState([]);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      fetch("http://localhost:5000/api/users")
        .then((res) => res.json())
        .then((data) => {
          setAccounts(data.data);
          const value = localStorage.getItem("movieforkhusernamekey");
          if (value) {
            const userAccount = data.data.find((acc) => acc.username === value);
            setUser({ ...userAccount });
            setLogged(true);
          } else {
            localStorage.setItem("movieforkhusernamekey", "");
          }
        });
    };
    fetchUsers();
  }, [logged]);

  useEffect(() => {}, []);

  function signOut() {
    setLogged(false);
    setUser({
      username: "",
      img: "",
      password: "",
      role: "",
      phone: "",
      dob: "",
      bio: "",
    });
    localStorage.setItem("movieforkhusernamekey", "");
  }

  function setnewuser(newuser) {
    setUser(newuser);
    setLogged(true);
  }

  return (
    <GlobaleContext.Provider
      value={{
        user,
        logged,
        accounts,
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
  success: false,
  setSuccess: (success) => set({ success }),
  message: "",
  setMessage: (message) => set({ message }),
  isloading: true,
  setIsloading: (isloading) => set({ isloading }),
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
      set({ movies: data.data, isloading: false });
    } catch (error) {
      console.error("Error fetching movies:", error);
      set({ movies: [] });
    }
  },
  createMovie: async (newMovie) => {
    if (
      !newMovie.name ||
      !newMovie.rate ||
      !newMovie.img ||
      !newMovie.type ||
      !newMovie.release ||
      !newMovie.genere ||
      !newMovie.runtime ||
      !newMovie.cover ||
      !newMovie.source ||
      !newMovie.detail
    ) {
      set({ success: false, message: "Please fill alls" });
      return { success: false, message: "Please fill alls" };
    }

    const res = await fetch(`${"http://localhost:5000"}/api/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });
    const data = await res.json();
    set((state) => ({ movies: [...state.movies, data.data] }));
    set({ success: true, message: "Movie create successfull" });
    return { success: true, message: "Movie create successfull" };
  },

  deleteMovie: async (movieId) => {
    if (!movieId) {
      set({ success: false, message: "Movie ID is required" });
      return { success: false, message: "Movie ID is required" };
    }

    const res = await fetch(
      `${"http://localhost:5000"}/api/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    if (!res.ok) {
      set({ success: false, message: "Failed to delete movie" });
      return {
        success: false,
        message: data.message || "Failed to delete movie",
      };
    }

    set((state) => ({
      movies: state.movies.filter((movie) => movie._id !== movieId),
    }));

    set({ success: true, message: "Movie deleted successfull" });
    return { success: true, message: "Movie deleted successfully" };
  },
  updateMovie: async (updatedMovie) => {
    if (
      !updatedMovie.name ||
      !updatedMovie.rate ||
      !updatedMovie.img ||
      !updatedMovie.type ||
      !updatedMovie.release ||
      !updatedMovie.genere ||
      !updatedMovie.runtime ||
      !updatedMovie.cover ||
      !updatedMovie.source ||
      !updatedMovie.detail
    ) {
      set({ success: false, message: "Please fill alls" });
      return { success: false, message: "Please fill alls" };
    }

    const res = await fetch(
      `${"http://localhost:5000"}/api/movies/${updatedMovie._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      }
    );

    if (!res.ok) {
      set({ success: false, message: "Failed to update movie" });
      return {
        success: false,
        message: data.message || "Failed to update movie",
      };
    }

    const data = await res.json();
    set((state) => ({
      movies: state.movies.map((movie) =>
        movie._id === updatedMovie._id ? data.data : movie
      ),
    }));

    set({ success: true, message: "Movie updated successfull" });
    return { success: true, message: "Movie updated successfull" };
  },
}));

export const useUserContext = create((set) => ({
  users: [],
  setUsers: (user) => set({ user }),
  success: false,
  setSuccess: (success) => set({ success }),
  message: "",
  setMessage: (message) => set({ message }),
  fetchUsers: async () => {
    try {
      const apiUrl = "http://localhost:5000";

      const res = await fetch(apiUrl + "/api/users");

      if (!res.ok) {
        throw new Error(
          `Failed to fetch users: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      set({ users: data.data });
    } catch (error) {
      console.error("Error fetching users:", error);
      set({ users: [] });
    }
  },
  createUser: async (newUser) => {
    try {
      const apiUrl = "http://localhost:5000";

      const { users } = useUserContext.getState(); // Access the latest users state

      // Validate new user fields
      if (!newUser.username || !newUser.password) {
        set({ success: false, message: "Please fill all fields" });
        return { success: false, message: "Please fill all fields" };
      }

      // Check for duplicate user
      const checkUser = users.find(
        (user) => user.username === newUser.username
      );
      if (checkUser) {
        set({ success: false, message: "User already exists" });
        return { success: false, message: "User already exists" };
      }

      // Create the new user
      const createRes = await fetch(`${apiUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const createdUserData = await createRes.json();
      set((state) => ({ users: [...state.users, createdUserData.data] }));
      set({ success: true, message: "User creation successful" });
      return { success: true, message: "User creation successful" };
    } catch (error) {
      console.error("Error creating user:", error);
      set({ success: false, message: "An error occurred while creating user" });
      return {
        success: false,
        message: "An error occurred while creating user",
      };
    }
  },
  updateUser: async (updatedUser) => {
    if (!updatedUser.username || !updatedUser.password) {
      set({ success: false, message: "Please fill alls" });
      return { success: false, message: "Please fill alls" };
    }

    const res = await fetch(
      `${"http://localhost:5000"}/api/users/${updatedUser._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    );

    if (!res.ok) {
      set({ success: false, message: "Failed to update movie" });
      return {
        success: false,
        message: data.message || "Failed to update movie",
      };
    }

    const data = await res.json();
    set((state) => ({
      users: state.users.map((user) =>
        user._id === updatedUser._id ? data.data : user
      ),
    }));

    set({ success: true, message: "Movie updated successfull" });
    return { success: true, message: "Movie updated successfull" };
  },
}));
