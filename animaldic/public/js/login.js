document.addEventListener("DOMContentLoaded", () => {
  const login_form = document.querySelector("form.login");
  const input_username = login_form.querySelector("input.userid");
  const input_password = login_form.querySelector("input.password");
  const btn_login = login_form.querySelector("input.btn_login");

  btn_login.addEventListener("click", () => {
    if (!input_username.value) {
      alert("ID를 입력해주세요");
      input_username.select();
      return false;
    }
    if (!input_password.value) {
      alert("비밀번호를 입력해주세요");
      input_password.select();
      return false;
    }
    login_form.submit();
  });
});
