import express from "express";

import {
  AskQuestion,
  getAllQuestions,
  deleteQuestion,
  voteQuestion,
} from "../controllers/Questions.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/Ask", auth, AskQuestion);
router.get("/get", getAllQuestions);
router.delete("/delete/:_id", auth, deleteQuestion);
router.patch("/vote/:_id", auth, voteQuestion);

export default router;
