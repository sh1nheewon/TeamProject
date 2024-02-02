import express from "express";
import DB from "../config/mysql.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("menu/home/home");
}); //기본 홈

router.get("/youtube", async (req, res) => {
  res.render("menu/home/youtube");
}); //홈에유튜브추천

router.get("/survey", async (req, res) => {
  res.render("menu/home/survey");
}); //홈에설문

// 메뉴들 ------------------------------

// router.get('/freeboard', async (req, res) => {
//   res.render("list")
// })

let dbConn = null;
//init 함수에 async가 설정되어 동기식으로 작동된다.
//이 함수에 return 값을 받가 위해서는 .then 함수를 통하여 받아야한다.
DB.init().then((connection) => {
  dbConn = connection;
});

console.log("dbConn", dbConn);

router.get("/freeboard", async (req, res) => {
  const sql = " SELECT * FROM tbl_bbd";
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
      return res.render("repost", { book: rows[0][0] });
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
      return res.redirect(`/${author}/detail`);
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

// ------------- 자유 게시판 end
router.get("/notice", async (req, res) => {
  res.render("menu/notice");
});
router.get("/login", async (req, res) => {
  res.render("menu/login");
});
router.get("/join", async (req, res) => {
  res.render("menu/join");
});
// 동물들 ---------------------------------------

router.get("/mouse1", async (req, res) => {
  res.render("animal/mouse/mouse1");
});
router.get("/mouse2", async (req, res) => {
  res.render("animal/mouse/mouse2");
});
router.get("/mouse3", async (req, res) => {
  res.render("animal/mouse/mouse3");
});
// -
router.get("/fish1", async (req, res) => {
  res.render("animal/fish/fish1");
});
router.get("/fish2", async (req, res) => {
  res.render("animal/fish/fish2");
});
router.get("/fish3", async (req, res) => {
  res.render("animal/fish/fish3");
});
//-
router.get("/bird1", async (req, res) => {
  res.render("animal/bird/bird1");
});
router.get("/bird2", async (req, res) => {
  res.render("animal/bird/bird2");
});
router.get("/bird3", async (req, res) => {
  res.render("animal/bird/bird3");
});
//-
router.get("/snake1", async (req, res) => {
  res.render("animal/snake/snake1");
});
router.get("/snake2", async (req, res) => {
  res.render("animal/snake/snake2");
});
router.get("/snake3", async (req, res) => {
  res.render("animal/snake/snake3");
});
//-
router.get("/cat1", async (req, res) => {
  res.render("animal/cat/cat1");
});
router.get("/cat2", async (req, res) => {
  res.render("animal/cat/cat2");
});
router.get("/cat3", async (req, res) => {
  res.render("animal/cat/cat3");
});

export default router;
