import express from "express";
import {
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/", getUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
