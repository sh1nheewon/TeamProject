import express from 'express'
const router = express.Router()


router.get('/', async (req, res) => {
  res.render("menu/home/home")
}) //기본 홈

router.get('/youtube', async (req, res) => {
  res.render("menu/home/youtube")
})//홈에유튜브추천

router.get('/survey', async (req, res) => {
  res.render("menu/home/survey")
})//홈에설문

// 메뉴들 ------------------------------

router.get('/freeboard', async (req, res) => {
  res.render("menu/freeboard")
})
router.get('/notice', async (req, res) => {
  res.render("menu/notice")
})
router.get('/login', async (req, res) => {
  res.render("menu/login")
})
router.get('/join', async (req, res) => {
  res.render("menu/join")
})
// 동물들 ---------------------------------------

router.get('/mouse1', async (req, res) => {
  res.render("animal/mouse/mouse1")
})
router.get('/mouse2', async (req, res) => {
  res.render("animal/mouse/mouse2")
})
router.get('/mouse3', async (req, res) => {
  res.render("animal/mouse/mouse3")
})
// -
router.get('/fish1', async (req, res) => {
  res.render("animal/fish/fish1")
})
router.get('/fish2', async (req, res) => {
  res.render("animal/fish/fish2")
})
router.get('/fish3', async (req, res) => {
  res.render("animal/fish/fish3")
})
//-
router.get('/bird1', async (req, res) => {
  res.render("animal/bird/bird1")
})
router.get('/bird2', async (req, res) => {
  res.render("animal/bird/bird2")
})
router.get('/bird3', async (req, res) => {
  res.render("animal/bird/bird3")
})
//-
router.get('/snake1', async (req, res) => {
  res.render("animal/snake/snake1")
})
router.get('/snake2', async (req, res) => {
  res.render("animal/snake/snake2")
})
router.get('/snake3', async (req, res) => {
  res.render("animal/snake/snake3")
})
//-
router.get('/cat1', async (req, res) => {
  res.render("animal/cat/cat1")
})
router.get('/cat2', async (req, res) => {
  res.render("animal/cat/cat2")
})
router.get('/cat3', async (req, res) => {
  res.render("animal/cat/cat3")
})




export default router
