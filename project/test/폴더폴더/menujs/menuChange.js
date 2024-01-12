// const hwamyeon = document.querySelector("section.hwamyeon");
const IMG_TAG_NAME = "IMG";

const ALT_TEXT = {
  설치류1: "설치류1",
  설치류2: "설치류2",
  설치류3: "설치류3",
  어류1: "어류1",
  어류2: "어류2",
  어류3: "어류3",
  조류1: "조류1",
  조류2: "조류2",
  조류3: "조류3",
  파충류1: "파충류1",
  파충류2: "파충류2",
  파충류3: "파충류3",
  포유류1: "포유류1",
  포유류2: "포유류2",
  포유류3: "포유류3",
};

const sub_menu = document.querySelector(".hwamyeon");

const changesection = (event) => {
  const target = event.target;
  const tag_name = target.tagName;
  if (tag_name === IMG_TAG_NAME) {
    const alt_text = target.getAttribute("alt");
    if (alt_text === ALT_TEXT.설치류1) {
      importHTML(sub_menu, "../폴더폴더/동물하위메뉴/submenu1.html");
    } else if (alt_text === ALT_TEXT.설치류2) {
      importHTML(sub_menu, "./03.html");
    }
  }
};
sub_menu.addEventListener("click", changesection);
