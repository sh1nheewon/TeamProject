import express from "express";
import DB from "../models/index.js";
import { upLoad } from "../modules/file_upload.js";
import { Op } from "sequelize";

const BBD = DB.models.tbl_bbd;
const USER = DB.models.tbl_members;

const router = express.Router();

let dbConn = null;
console.log("dbConn", dbConn);

router.get("/", async (req, res) => {
  const con = req.query.option;
  const search = req.query.search || "";
  const sort = req.query.sort || "num";
  const order = req.query.order || "ASC";

  if (con === "title") {
    const rows = await BBD.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${search}%` } }, { num: { [Op.like]: `%${search}%` } }],
      },
      order: [[sort, order]],
    });
    return res.render("menu/freeboard/list", { BBD: rows, search });
  } else {
    const rows = await BBD.findAll({
      where: {
        [Op.or]: [{ author: { [Op.like]: `%${search}%` } }, { num: { [Op.like]: `%${search}%` } }],
      },
      order: [[sort, order]],
    });
    return res.render("menu/freeboard/list", { BBD: rows, search });
  }
});

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

router.post("/insert", upLoad.single("image"), async (req, res) => {
  const username = req.body.author;
  const password = req.body.password;
  const file = req.file;

  const result = await USER.findByPk(username);
  if (!result) {
    res.send("아이디가 잘못되었습니다.");
  } else if (result.m_username === username) {
    if (result.m_password === password) {
      let num = req.body.num;
      if (!num) {
        const rows = await BBD.findAll({ order: [["num", "DESC"]], limit: 1 });
        num = rows[0].num;
        num = Number(num) + 1;
        req.body.num = num;
      }

      if (file) {
        req.body.image_name = file.fieldname;
        req.body.image_origin_name = file.originalname;
      }
      const bd_data = req.body;

      try {
        await BBD.create(bd_data);
        return res.redirect("/freeboard");
      } catch (error) {
        return res.json(error);
      }
    } else {
      res.send("비밀번호가 잘못되었습니다.");
    }
  }

  // const file = req.file;
  // if (file) {
  //   req.body.image_name = file.fieldname;
  //   req.body.image_origin_name = file.originalname;
  // }
  // const bd_data = req.body;

  // try {
  //   await BBD.create(bd_data);
  //   return res.redirect("/freeboard");
  // } catch (error) {
  //   return res.json(error);
  // }
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
    return res.render("menu/freeboard/update", { bd: row });
  } catch (error) {
    return res.json(error);
  }
});

router.post("/:num/update", upLoad.single("image"), async (req, res) => {
  const num = req.params.num;
  const username = req.body.author;
  const password = req.body.password;

  try {
    // 사용자를 데이터베이스에서 찾습니다.
    const result = await USER.findByPk(username);

    if (!result) {
      // 사용자를 찾지 못한 경우
      return res.send("사용자를 찾을 수 없습니다.");
    }

    // 사용자를 찾은 경우
    if (result.m_username === username) {
      // 사용자명이 일치하는 경우
      if (result.m_password === password) {
        // 비밀번호가 일치하는 경우
        const bd_data = req.body;
        try {
          // 게시글을 업데이트합니다.
          await BBD.update(bd_data, { where: { num } });
          return res.redirect(`/freeboard/${num}/detail`);
        } catch (error) {
          // 업데이트 과정에서 오류가 발생한 경우
          console.error(error);
          return res.send("게시글을 업데이트하는 중 오류가 발생했습니다.");
        }
      } else {
        // 비밀번호가 일치하지 않는 경우
        return res.send("비밀번호가 잘못되었습니다.");
      }
    } else {
      // 사용자명이 일치하지 않는 경우
      return res.send("사용자명이 잘못되었습니다.");
    }
  } catch (error) {
    // 데이터베이스 조회 중 오류가 발생한 경우
    console.error(error);
  }
});

router.post("/:num/detail", async (req, res) => {
  const username = req.body.author; // 클라이언트가 제공한 사용자명
  const password = req.body.password; // 클라이언트가 제공한 비밀번호
  const num = req.params.num; // 게시물 번호

  // 사용자명을 이용하여 데이터베이스에서 사용자 정보를 조회합니다.
  const result = await USER.findByPk(username);

  // 사용자가 존재하고, 비밀번호가 일치하는 경우에만 게시물을 삭제합니다.
  if (result && result.m_password === password) {
    try {
      // 게시물을 삭제합니다.
      await BBD.destroy({ where: { num } });

      // 삭제가 성공하면 홈 화면으로 리다이렉트합니다.
      res.redirect("/freeboard");
    } catch (error) {
      // 삭제 중 오류가 발생한 경우 오류를 클라이언트로 전송합니다.
      res.status(500).send("게시물을 삭제하는 중 오류가 발생했습니다.");
    }
  } else {
    // 사용자가 존재하지 않거나 비밀번호가 일치하지 않는 경우 오류를 클라이언트로 전송합니다.
    res.status(401).send("사용자 인증에 실패하였습니다.");
  }
});

////////////////////////////////////////////////

export default router;
