const join_btn_click_event = async () => {
  const content = document.querySelector("title");
  const userid = join_form.querySelector("#userid");
  const password = join_form.querySelector("#password");

  if (userid.value === "") {
    alert("사용자 ID를 입력해야 합니다.");
    userid.select();
    return false;
  } else {
    //Async 방식으로 server 에 userid check 요청
    const response = await fetch(`/users/${userid.value}/check`);
    const json = await response.json();
    console.log(json);
    if (json.MESSAGE === "FOUND") {
      alert("이미 등록된 사용자 ID 입니다.");
      userid.select();
      return false;
    } else {
      alert("사용 가능한 사용자 ID 입니다");
      password.select;
    }
  }

  if (password.value === "") {
    alert("비밀번호를 입력해야 합니다.");
    password.select();
    return false;
  }

  if (re_password.value === "") {
    alert("비밀번호를 입력해야 합니다.");
    re_password.select();
    return false;
  }
  if (password.value !== re_password.value) {
    alert("비밀번호 확인 값이 다릅니다");
    password.select;
    return false;
  }
  join_form.submit();
};
document.addEventListener("DOMContentLoaded", () => {
  const join_btn = document.querySelector("#join_btn");
  join_btn.addEventListener("click", join_btn_click_event);
});
