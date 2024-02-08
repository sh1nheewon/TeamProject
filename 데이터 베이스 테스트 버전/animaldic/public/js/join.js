document.addEventListener("DOMContentLoaded", () => {
  // 회원가입을 할 때 작성할 값을 input box 로 만들고,
  // 그 값을 저장할 변수를 input_userXXX 로 선언

  const input_userid = document.querySelector("input[name='userid']");
  const input_userpassword = document.querySelector("input[name='userpassword']");
  const input_checkpassword = document.querySelector("input[name='checkpassword']");
  const input_username = document.querySelector("input[name='username']");
  const input_userdate = document.querySelector("input[name='userdate']");
  const input_useraddr = document.querySelector("input[name='useraddr']");
  const input_usertel = document.querySelector("input[name='usertel']");
  const input_useremail = document.querySelector("input[name='useremail']");

  // 회원가입 버튼을 눌렀을 때,
  // 값을 입력한 곳이 있으면 알림창을 보여주고 값이 없는 자리로 이동
  const btn_join = document.querySelector("div.btn_join");
  btn_join.addEventListener("click", () => {
    // 저장한 값을 변수에 저장
    const txt_userid = input_userid.value;
    const txt_userpassword = input_userpassword.value;
    const txt_checkpassword = input_checkpassword.value;
    const txt_username = input_username.value;
    const txt_userdate = input_userdate.value;
    const txt_useraddr = input_useraddr.value;
    const txt_usertel = input_usertel.value;
    const txt_useremail = input_useremail.value;

    // 값이 없으면 값이 없다는 알림창이 나오도록 함

    if (!txt_userid) {
      alert("ID 를 입력해 주세요");
      input_userid.focus();
      return false;
    }

    if (!txt_userpassword) {
      alert("비밀번호를 입력해 주세요");
      input_userpassword.focus();
      return false;
    }

    if (!txt_checkpassword) {
      alert("비밀번호를 한번 더 입력해 주세요");
      input_checkpassword.focus();
      return false;
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // 회원가입 버튼을 눌렀을 때, 비번확인을 안누르면 누르게끔 만들기

    if (!txt_username) {
      alert("이름을 입력해 주세요");
      input_username.focus();
      return false;
    }
    if (!txt_userdate) {
      alert("생년월일을 입력해 주세요");
      input_userdate.focus();
      return false;
    }
    if (!txt_useraddr) {
      alert("주소를 입력해 주세요");
      input_useraddr.focus();
      return false;
    }
    if (!txt_usertel) {
      alert("전화번호를 입력해 주세요");
      input_usertel.focus();
      return false;
    }
    if (!txt_useremail) {
      alert("이메일을 입력해 주세요");
      input_useremail.focus();
      return false;
    }

    alert("회원가입이 완료되었습니다.");
    document.location.href = "/";

    // 회원가입을 완료하면 알림창이 뜨고 확인 버튼을 누르면 홈으로 가기.
  });

  // 아이디 중복확인
  const btn_checkid = document.querySelector("button.btn_userid");
  btn_checkid.addEventListener("click", () => {
    input_userpassword.focus();
    alert("사용가능한 ID 입니다.");

    /*

        // 새로 입력하는 input_userid.value 의 값과 
        // db에 이미 저장된 userid 의 값이 같다면
        // 이미 있는 아이디라고 알림을 보내고 다시 입력하도록 만들기
        //--- db_userid : 데이터베이스에 저장되어있는 유저 아이디의 값.

        const btn_checkid = document.querySelector("button.btn_userid");
        btn_checkid.addEventListener("click", () => {
         if(db_userid !== input_userid.value) {
            input_userpassword.focus();
            alert("사용가능한 ID");
         } else {
            input_userid.focus();
            alert("이미 사용중인 ID");
            return false;
         } 
        }

         */
  });

  // 비밀번호 확인
  const btn_checkpw = document.querySelector("button.btn_pw");
  btn_checkpw.addEventListener("click", () => {
    // 사용할 비밀번호를 입력하는 박스가 빈칸인 상태에서 "비밀번호확인" 버튼을 누르면 사용할 비밀번호 입력칸으로 커서 이동.
    // 비밀번호확인을 입력하는 박스가 빈칸인 상태에서 "비밀번호확인" 버튼을 누르면 비밀번호확인 입력칸으로 커서 이동.
    if (input_userpassword.value === "") {
      alert("비밀번호를 입력해 주세요");
      input_userpassword.focus();
      return false;
    } else if (input_checkpassword.value === "") {
      alert("비밀번호를 한번 더 입력해 주세요");
      input_checkpassword.focus();
      return false;
    }

    // 비밀번호와 비밀번호 확인의 값이 일치하지 않으면 알림창이 뜨고 다시 입력하도록 함.
    // 일치하면 다음 입력칸인 이름 입력 박스로 커서 이동.
    if (input_checkpassword.value !== input_userpassword.value) {
      input_checkpassword.focus();
      alert("비밀번호가 일치하지 않습니다");
      return false;
    } else {
      input_username.focus();
      alert("비밀번호가 확인되었습니다");
    }
  });
});
