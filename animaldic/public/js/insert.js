document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.write");
  const btn_post = form.querySelector("input.btn_post");
  const btn_list = form.querySelector("input.btn_list");
  const author = form.querySelector("input[name='author']");
  const content = form.querySelector("textarea[name='content']");
  const title = form.querySelector("input[name='title']");
  const password = form.querySelector("input[name='password']");

  btn_list.addEventListener("click", () => {
    document.location.replace("/freeboard");
  });

  btn_post.addEventListener("click", () => {
    if (!title.value) {
      alert("제목을 작성해주세요");
      title.select();
      return false;
    }
    if (!content.value) {
      alert("내용을 작성해주세요");
      content.select();
      return false;
    }
    if (!author.value) {
      alert("아이디를 작성해주세요");
      author.select();
      return false;
    }
    if (!password.value) {
      alert("비밀번호를 작성해주세요");
      password.select();
      return false;
    }
    form.submit();
  });
});
