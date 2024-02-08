document.addEventListener("DOMContentLoadede", () => {
  const btn_re = document.querySelector("button.repost");
  btn_re.addEventListener("click", (e) => {
    document.location.replace(`freeboard/${e.target.dataset.num}/detail`);
  });
});
