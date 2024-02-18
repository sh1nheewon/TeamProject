document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.write");
  const btn_re = document.querySelector("input.repost");
  const list = document.querySelector("input.btn_list")
  const password = document.querySelector("input[name='password']");


  list.addEventListener("click",()=>{
    document.location.replace("/freeboard")
  })

  btn_re.addEventListener("click", (e) => {
            if(!password.value){
          alert("비밀번호를 작성해주세요");
          password.select();
          return false;
        }
        form.submit();
  });
});
