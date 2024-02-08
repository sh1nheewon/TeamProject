document.addEventListener("DOMContentLoaded", () => {
  const btn_box = document.querySelector("div.freebutton");
  btn_box.addEventListener("click", (e) => {
    const button = e.target;
    if (button.tagName === "BUTTON") {
      const className = button.className;
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
