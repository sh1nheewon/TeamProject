document.addEventListener("DOMContentLoaded", () => {
  const user = "<%= user %>";
  const password = document.querySelector("input[name='password']");
  const form = document.querySelector("form.write");
  const btn_update = form.querySelector(".btn.update");
  const btn_delete = form.querySelector(".btn.delete");
  const btn_list = form.querySelector(".btn_list");

  btn_update.addEventListener("click", () => {
    const parDIV = btn_update.closest("div"); // 'DIV'를 'div'로 수정
    const num = parDIV.dataset.num;

    document.location.replace(`/freeboard/${num}/update`);
  });

  btn_delete.addEventListener("click", (e) => {
    if (!confirm("게시글을 삭제하겠습니까?")) {
      return false;
    }

    if (!user && !password.value) {
      alert("비밀번호를 작성해주세요");
      password.focus(); // 포커스를 비밀번호 입력 필드로 변경
      return false; // 데이터 전송을 하지 않음
    }

    // 조건이 충족되면 폼 제출
    form.submit();
  });

  btn_list.addEventListener("click", () => {
    document.location.replace("/freeboard");
  });
});
