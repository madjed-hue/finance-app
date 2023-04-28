import express from "express";
import { getAllStats } from "../controllers/statController.js";

const router = express.Router();

router.get("/", getAllStats);

export default router;
