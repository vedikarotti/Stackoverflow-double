import express from "express";

import { postWebhook, getWebhook } from "../controllers/webhook.js";

const router = express.Router();

router.post("/webhook", postWebhook);
router.get("/webhook", getWebhook);

export default router;
