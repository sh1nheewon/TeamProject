import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../modules/file_upload.js";
const BBD = DB.models.tbl_bbd;
const USER = DB.models.tbl_members;

const router = express.Router();

let dbConn = null;
console.log("dbConn", dbConn);

router.get("/", async (req, res) => {
  try {
    const rows = await BBD.findAll({ limit: 10 });
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
  const username = req.body.m_username;
  const password = req.body.m_password;
  const result = await USER.findByPk(username);
  if (!result) {
    return res.redirect(`/repost?fail=${LOGIN_MESSAGE.USER_NOT}`);
  } else if (result.m_username === username) {
    const hashAlgorithm = await crypto.createHash("sha512");
    const hashing = hashAlgorithm.update(password);
    const hashPassword = hashing.digest("base64");

    if (result.m_password === hashPassword) {
      req.session.user = result;
      return res.redirect("/");
    }
  } else {
    return res.redirect(`/users/login?fial=${LOGIN_MESSAGE.PASS_WRONG}`);
  }

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

////////////////////////////////////////////////

export default router;
