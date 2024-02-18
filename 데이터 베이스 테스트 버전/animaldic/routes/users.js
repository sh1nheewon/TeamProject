import express from "express";
import DB from "../models/index.js";
const USER = DB.models.tbl_members;
const router = express.Router();

let crypto;
try {
  crypto = await import("node:crypto");
} catch (error) {
  console.error(`Cryto 모듈을 사용할 수 없음 ${error}`);
}

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/join", async (req, res) => {
  res.render("users/join");
});

router.post("/join", async (req, res) => {
  
  const rows = await USER.findAll();
  if (rows.length > 0) {
    req.body.m_role = "USER";
  } else {
    req.body.m_role = "ADMIN";
  }

 
  const password = req.body.m_password;


  const hashAlgorithm = await crypto.createHash("sha512");
 
  const hashing = await hashAlgorithm.update(password);
 
  const hashPassword = await hashing.digest("base64");

  req.body.m_password = hashPassword;

  
  const result = await USER.create(req.body);
  return res.redirect("/users/login");
});

/**
 * GET http://localhost:3000/users/callor/check라는 요청이 되면
 * callor 라는 사용자 정보가 Table에 저장되어 있냐 라는 것을 묻기
 * 있으면 MESSAGE = FOUND
 * 없으면 MESSAGE = NOT FOUND
 */
router.get("/:username/check", async (req, res) => {
  const username = req.params.username;
  const row = await USER.findByPk(username);
  console.log(row);
  if (row) {
    return res.json({ MESSAGE: "FOUND" });
  } else {
    return res.json({ MESSAGE: "NOT FOUND" });
  }
});

const LOGIN_MESSAGE = {
  USER_NOT: "사용자 ID 없음",
  PASS_WRONG: "비밀번호 오류",
  NEED_LOGIN: "로그인 필요",
};
router.get("/login", (req, res) => {
  const message = req.query.fail;
  return res.render("users/login", { NEED: message });
});

/**
 * 사용자가 login 화면에서 로그인을 실행하면 요청을 처리할 router를 만들고
 * DB 에서 사용자 정보르 조회한 후 DB에 저장된 사용자인지 아닌지 여부를 응답
 */

router.post("/login", async (req, res) => {
  const username = req.body.m_username;
  const password = req.body.m_password;
  const result = await USER.findByPk(username);
  if (!result) {
    //  return res.json({ MESSAGE: "USER NOT FOUND" });
    return res.redirect(`/users/login?fail=${LOGIN_MESSAGE.USER_NOT}`);
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
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/");
});

export default router;


