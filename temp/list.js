document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("table.list");
  tbody.addEventListener("click", (e) => {
    //target은 td 태그
    const target = e.target;
    if (target.tagName === "TD") {
      const parTr = target.closest("TR");
      const author = parTr.dataset.author;

      document.location.replace(`${author}/detail`);
    }
  });
});
