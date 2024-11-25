import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import movieRoute from "./route/movie.route.js";

dotenv.config();

connectDB();
const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*", // Replace with your frontend URL in production
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/movies", movieRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit();
});
