import express from "express";
import {
  getMovie,
  createMovie,
  deleteMovie,
  updateMovie,
} from "../controller/movie.controller.js";

const router = express.Router();

router.get("/", getMovie);
router.post("/", createMovie);
router.delete("/:id", deleteMovie);
router.put("/:id", updateMovie);

export default router;
