import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../modules/file_upload.js";
const BBD = DB.models.tbl_bbd;

const router = express.Router();

let dbConn = null;
console.log("dbConn", dbConn);

router.get("/", async (req, res) => {
  try {
    const rows = await BBD.findAll({ limit: 10 });
    //return res.json(rows);
    return res.render("menu/freeboard/list", { BBD: rows });
  } catch (error) {
    return res.json(error);
  }
});

router.get("/insert", (req, res) => {
  return res.render("menu/freeboard/insert");
});

router.post("/insert", upLoad.single("p_image"), async (req, res) => {
  const file = req.file;
  if (file) {
    req.body.p_image_name = file.fieldname;
    req.body.p_image_origin_name = file.originalname;
  }
  const bd_data = req.body;
  try {
    await BBD.create(bd_data);
    return res.redirect("/freeboard");
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:num/detail", async (req, res) => {
  const num = req.params.num;
  try {
    const row = await BBD.findByPk(num);
    return res.render("menu/freeboard/detail", { bd: row });
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:num/update", async (req, res) => {
  const num = req.params.num;
  try {
    const row = await BBD.findByPk(num);
    return res.render("menu/freeboard/repost", { bd: row });
  } catch (error) {
    return res.json(error);
  }
});

router.post("/:num/update", async (req, res) => {
  const bd_data = req.body;
  const num = req.params.num;
  try {
    await BBD.update(bd_data, { where: { num } });
    return res.redirect(`/freeboard/${num}/detail`);
  } catch (error) {}
});

router.get("/:num/delete", async (req, res) => {
  const num = req.params.num;
  try {
    await BBD.destroy({ where: { num } });
    return res.redirect(`/freeboard`);
  } catch (error) {
    return res.json(error);
  }
});

export default router;
