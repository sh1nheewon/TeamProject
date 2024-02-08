document.addEventListener("DOMContentLoaded", () => {
  const ulContent = document.querySelector("section.list ul");
  const todoInput = document.querySelector("section.input input");
  // 3개의 요소를 갖는 리스트 만들기
  const todoList = ["산책시키기", "목욕시키기", "발톱 깎아주기", "털 빗어주기", "밥주기"];

  const createLiTag = (todoContent) => {
    // <span></span>  // span 태그를 만들어라
    const spanComplete = document.createElement("SPAN");
    const spanTodo = document.createElement("SPAN");
    const spanClose = document.createElement("SPAN");
    const litag = document.createElement("LI"); //태그만들기

    //위에서 만들어진 span tag에 각각 class를 부착하라
    // <span class ="complete"></span>
    spanComplete.classList.add("complete");
    spanTodo.classList.add("todo");
    spanClose.classList.add("close");

    spanComplete.innerHTML = "&check;"; //체크표시 넣어주고/span1에
    spanTodo.innerHTML = todoContent; //매개변수로 받은걸 여기에다가 //2에
    spanClose.innerHTML = "&times;"; //x표시넣고 //3에

    litag.appendChild(spanComplete);
    litag.appendChild(spanTodo);
    litag.appendChild(spanClose);

    ulContent.appendChild(litag);
  };

  const createTodoList = () => {
    ulContent.innerHTML = "";
    todoList.forEach((item) => createLiTag(item));
  };

  createTodoList();

  ulContent.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "SPAN") {
      /*
          span tag에 close 클래스가 부착된 친구인가?
          */
      if (target.className === "close") {
        // 삭제할지 물어보기
        //선택된 SPAN 태그가 close면
        if (confirm("지우시겠습니까?")) {
          //삭제를 허락하면
          //현재 span 의 부모인 LI tag를 감추기
          target.closest("LI").style.display = "none";
        }
        return false;
      }

      const liTag = target.closest("LI");

      liTag?.classList.toggle("complete");
    }
  });
  const addBtn = document.querySelector("section.input button");
  addBtn?.addEventListener("click", () => {
    // null아니면 실행하고
    const todo = todoInput.value;
    //todo 가 falsy(비어있으)면
    if (!todo) {
      alert("내용을 입력해 주세요");
      todoInput.select(); //입력칸에 커서옮겨가게
      return false; // 입력이 안되면 더이상진행x
    }
    // List(배열)의 끝에 새로운 값을 추가하기
    todoList.push(todo);
    // createTodoList(); //함수실행
    createLiTag(todo); //위에는 리스트를 새로만드는거여서 새로추가하면 체크표시가 해제되버리니까
    todoInput.value = ""; // 입력한칸 지우기
  }); // end addBtn click
}); // DOMContentLoaded
