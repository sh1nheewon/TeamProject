import express from "express";
import DB from "../config/mysql.js";
const router = express.Router();

let dbConn = null;

DB.init().then((connection) => {
  dbConn = connection;
});

console.log("dbConn", dbConn);

router.get("/", async (req, res) => {
  const sql = " SELECT * FROM tbl_bbd";
  dbConn
    .query(sql)
    //쿼리 함수 실행이 완료되면 .then 함수에게 결과 전달
    .then((rows) => {
      return res.render("menu/freeboard/list", { books: rows[0] });
    })
    //실행 중에 오류나면 전달
    .catch((err) => {
      return res.render("db_error", err);
    });
});

router.get("/insert", (req, res) => {
  return res.render("menu/freeboard/insert");
});

router.post("/insert", (req, res) => {
  const sql = " INSERT INTO tbl_bbd SET ? ";
  const params = {
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
  };
  dbConn
    .query(sql, params)
    .then((_) => {
      return res.redirect("/freeboard");
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
      return res.render("menu/freeboard/detail", { book: rows[0][0] });
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
      return res.redirect("/freeboard");
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

router.get("/:author/update", (req, res) => {
  const author = req.params.author;
  const sql = " SELECT * FROM tbl_bbd WHERE author = ? ";

  dbConn
    .query(sql, author)
    .then((rows) => {
      return res.render("menu/freeboard/repost", { book: rows[0][0] });
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

router.post("/:author/update", (req, res) => {
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
      return res.redirect(`/freeboard/${author}/detail`);
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

export default router;
