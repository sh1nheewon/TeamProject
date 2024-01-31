function calculateScore() {
  var score = 0;

  // 질문에 대한 점수 계산
  if (document.getElementById("question1_yes").checked) {
    score += 1;
  }

  if (document.getElementById("question2_yes").checked) {
    score += 1;
  }

  if (document.getElementById("question3_yes").checked) {
    score += 1;
  }

  if (document.getElementById("question4_yes").checked) {
    score += 1;
  }

  if (document.getElementById("question5_yes").checked) {
    score += 1;
  }

  if (document.getElementById("question6_yes").checked) {
    score += 1;
  }

  // 점수에 따라 결과 표시
  if (score == 0) {
    // 0점
    document.getElementById("result").innerHTML = score + "점 : 당신은 아직 반려동물을 들일 준비가 되지않았네요...";
  } else if (score <= 2) {
    // 1~2점
    document.getElementById("result").innerHTML = score + "점 : 노력이 많이 필요합니다..";
  } else if (score <= 4) {
    // 3~4점
    document.getElementById("result").innerHTML = score + "점 : 아쉽네요.. 조금더 노력이 필요합니다";
  } else if (score == 5) {
    // 4~5점
    document.getElementById("result").innerHTML = score + "점 : 조금더 노력하면 반려동물을 키울 수 있겠네요!";
  } else {
    // 만점 6점
    document.getElementById("result").innerHTML = score + "점 : 훌륭합니다! 반려동물을 키울 준비가 완벽히 되어계시네요";
  }
}
