import express from "express";
import {
  getAllStats,
  groupByCountry,
  groupByRegion,
  groupByTopic,
} from "../controllers/statController.js";

const router = express.Router();

router.get("/", getAllStats);
router.get("/country", groupByCountry);
router.get("/topics", groupByTopic);
router.get("/region", groupByRegion);

export default router;
