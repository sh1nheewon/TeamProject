import express from "express";
import DB from "../models/index.js";
const NOTICE = DB.models.tbl_notice;
const router = express.Router();

router.get("/", (req, res) => {
  res.render("menu/notice");
});

export default router;
