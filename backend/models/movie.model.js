import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    release: {
      type: String,
      required: true,
    },
    genere: {
      type: String,
      required: true,
    },
    runtime: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    trending: {
      type: Boolean,
      default: false,
      required: false,
    },
    source: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
