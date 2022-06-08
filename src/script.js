let inputText;
let tasksArr = [];

function addUser() {
  inputText = document.getElementById("userInput").value;
  document.getElementById("display").innerHTML = inputText;
  tasksArr.push(inputText);
}
