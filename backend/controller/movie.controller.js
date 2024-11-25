import Movie from "../models/movie.model.js";
import mongoose from "mongoose";

export const getMovie = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ success: true, data: movies });
  } catch (error) {
    console.log("error in fetching movies:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createMovie = async (req, res) => {
  const movie = req.body;

  // Check if required fields are provided
  if (
    !movie.name ||
    !movie.rate ||
    !movie.img ||
    !movie.release ||
    !movie.genere ||
    !movie.runtime ||
    !movie.type ||
    !movie.cover ||
    !movie.source ||
    !movie.detail
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newMovie = new Movie(movie);

  try {
    await newMovie.save();
    res.status(201).json({ success: true, data: newMovie });
  } catch (error) {
    console.error("Error creating new movie", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Movie Id" });
  }

  try {
    await Movie.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Movie not found" });
  }
};

export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const movie = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Movie Id" });
  }

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, movie, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log("Eorror Update data", error);
  }
};
