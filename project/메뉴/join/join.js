document.addEventListener("DOMContentLoaded", () => {
    const btn_join = document.querySelector("button.btn_join");

    const input_userid = document.querySelector("input[name='userid']");
    const input_userpassword = document.querySelector("#userpassword");
    const input_checkpassword = document.querySelector("#checkpassword");
    const input_username = document.querySelector("#username");
    const input_userdate = document.querySelector("#userdate");
    const input_useraddr = document.querySelector("#useraddr");
    const input_usertel = document.querySelector("#usertel");
    const input_usermail = document.querySelector("#usermail");


    btn_join.addEventListener("click", () => {

        const txt_id = input_userid.value;
        const txt_userPW = input_userpassword.value;
        const txt_checkPW = input_checkpassword.value;
        const txt_name = input_username.value;
        const txt_date = input_userdate.value;
        const txt_addr = input_useraddr.value;
        const txt_tel = input_usertel.value;
        const txt_mail = input_usermail.value;


        if (!txt_id) {
            alert("ID 를 입력해 주세요");
            input_userid.focus();
            return false;
        }
        if (!txt_userPW) {
            alert("비밀번호를 입력해 주세요");
            input_userpassword.focus();
            return false;
        }
        if (!txt_checkPW) {
            alert("비밀번호를 한번 더 입력해 주세요");
            input_checkpassword.focus();
            return false;
        }
        if (!txt_name) {
            alert("이름을 입력해 주세요");
            input_username.focus();
            return false;
        }
        if (!txt_date) {
            alert("생년월일을 입력해 주세요");
            input_userdate.focus();
            return false;
        }
        if (!txt_addr) {
            alert("주소를 입력해 주세요");
            input_useraddr.focus();
            return false;
        }
        if (!txt_tel) {
            alert("전화번호를 입력해 주세요");
            input_usertel.focus();
            return false;
        }
        if (!txt_mail) {
            alert("이메일 주소를 입력해 주세요");
            input_usermail.focus();
            return false;
        }

        const form = document.querySelector("form");
        form.submit();


    });






});