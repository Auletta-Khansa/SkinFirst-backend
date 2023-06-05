import express from "express";
import { saveHistory, getHistoryByUserId } from "../controllers/HistoryController.js";

const router = express.Router();

router.get('/history/:userId', getHistoryByUserId);
router.post('/history/:userId/diagnose', saveHistory);

export default router;