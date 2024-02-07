document.addEventListener("DOMContentLoaded", () => {
  const btn_box = document.querySelector("div.freebutton");
  btn_box.addEventListener("click", (e) => {
    const button = e.target;
    if (button.tagName === "BUTTON") {
      const className = button.className;
      //const num = button.dataset.num;

      //버튼들을 감싸고 있는 박스 태그에 부착된 데이터 num 값을 가져오기.
      const parDIV = button.closest("DIV");
      const num = parDIV.dataset.num;

      let url = "/";

      if (className === "update") {
        url += `freeboard/${num}/update`;
      } else if (className === "delete") {
        if (!confirm("게시글을 삭제하겠습니까?")) {
          return false;
        }
        url += `freeboard/${num}/delete`;
      } else if (className === "list") {
        url += "freeboard";
      }
      document.location.replace(url);
    }
  });
});
