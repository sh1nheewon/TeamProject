const post = document.querySelector(".post");
const post_click_event = () => {
  alert("업로드 완료");
  document.location.href = "../자유게시판.html";
};
post.addEventListener("click", post_click_event);
