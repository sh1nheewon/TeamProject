document.addEventListener("DOMContentLoaded", () => {
    const btn_join = document.querySelector("button.btn_join");
    btn_join.addEventListener("click", () => {

        alert("회원가입이 완료되었습니다.");
        document.location.href = "/project/홈메뉴.html";

        // 회원가입을 완료하면 알림창이 뜨고 확인 버튼을 누르면 홈으로 가기.
        //  홈으로 보낼지 회원가입이니깐 로그인 화면으로 보낼지 결정하기

    });

});