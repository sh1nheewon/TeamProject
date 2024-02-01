import express from "express";
import DB from "../config/mysql.js";
const router = express.Router();

let dbConn = null;
//init 함수에 async가 설정되어 동기식으로 작동된다.
//이 함수에 return 값을 받가 위해서는 .then 함수를 통하여 받아야한다.
DB.init().then((connection) => {
  dbConn = connection;
});

console.log("dbConn", dbConn);

router.get("/", async (req, res) => {
  res.render("list");
  dbConn
    .query(sql)
    //쿼리 함수 실행이 완료되면 .then 함수에게 결과 전달
    .then((rows) => {
      return res.render("list", { books: rows[0] });
    })
    //실행 중에 오류나면 전달
    .catch((err) => {
      return res.render("db_error", err);
    });
});

router.get("/insert", (req, res) => {
  return res.render("insert");
});

router.post("/insert", (req, res) => {
  /**
   * mysql2 dependency 도구가 지원하는 확장된 도구
   * 정식 도구는 아님
   */
  const sql = " INSERT INTO tbl_bbd SET ? ";
  const params = {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
  };
  dbConn
    .query(sql, params)
    .then((_) => {
      return res.redirect("/");
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
  //return res.json(params);
});

router.get("/:author/detail", (req, res) => {
  const author = req.params.author;
  const sql = " SELECT * FROM tbl_bbd WHERE author = ? ";
  dbConn
    .query(sql, author)
    .then((rows) => {
      return res.render("detail", { book: rows[0][0] });
    })
    .catch((err) => {
      return res.json(err);
    });
});

router.get("/:author/delete", (req, res) => {
  const author = req.params.author;
  const sql = " DELETE FROM tbl_bbd WHERE author = ? ";
  dbConn
    .query(sql, author)
    .then((_) => {
      return res.redirect("/");
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

router.get("/ani1", (req, res) => {
  return res.render("ani1");
});
router.get("/ani2", (req, res) => {
  return res.render("ani2");
});
router.get("/ani3", (req, res) => {
  return res.render("ani3");
});

router.get("/:author/update", (req, res) => {
  const author = req.params.author;
  const sql = " SELECT * FROM tbl_bbd WHERE author = ? ";

  dbConn
    .query(sql, author)
    .then((rows) => {
      return res.render("repost", { book: rows[0][0] });
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

router.post("/:author/repost", (req, res) => {
  const author = req.params.author;
  const params = {
    author: author,
    title: req.body.title,
    content: req.body.content,
  };

  const sql = " UPDATE tbl_bbd SET ? WHERE author = ? ";

  dbConn
    .query(sql, [params, author])
    .then((_) => {
      return res.redirect(`/${author}/detail`);
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

export default router;
