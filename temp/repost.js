document.addEventListener("DOMContentLoadede", () => {
  const btn_re = document.querySelector("button.repost");
  btn_re.addEventListener("click", (e) => {
    document.location.replace(`/${e.target.dataset.author}/detail`);
  });
});
