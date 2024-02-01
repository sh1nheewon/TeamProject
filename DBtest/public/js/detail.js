document.addEventListener("DOMContentLoaded", () => {
  const btn_box = document.querySelector("div.btn");
  btn_box.addEventListener("click", (e) => {
    const button = e.target;
    if (button.tagName === "BUTTON") {
      const className = button.className;
      //const author = button.dataset.author;

      //버튼들을 감싸고 있는 박스 태그에 부착된 데이터 author 값을 가져오기.
      const parDIV = button.closest("DIV");
      const author = parDIV.dataset.author;

      let url = "/";

      if (className === "update") {
        url += `${author}/update`;
      } else if (className === "delete") {
        if (!confirm("게시글을 삭제하겠습니까?")) {
          return false;
        }
        url += `${author}/delete`;
      } else if (className === "repost") {
        url += `${author}/repost`;
      }
      document.location.replace(url);
    }
  });
});
