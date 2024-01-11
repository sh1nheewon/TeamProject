const importHTML = (tag, file) => {
  // 데이터를 주고받는 언어
  const xhr = new XMLHttpRequest(); //http통신을 이용해서,(리퀘)요청. 변수를.
  xhr.open("GET", file, true); // file매개변수에 저장된값을 open에 주입
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      tag.innerHTML = xhr.responseText;
    }
  };
  xhr.send(); // 위: 파일을 열어서, 여기: 나한테 보내줘
};
