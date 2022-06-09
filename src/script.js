let inputText;
let tasksArr = [];
const todoWebApp = "todo-web-app";

function addUser() {
  inputText = document.getElementById("userInput").value;
  tasksArr.push(inputText);

  for (let i = 0; i < tasksArr.length; i++) {
    let ourDisplayText = document.createElement("h5");
    let text = document.createTextNode(tasksArr);
    ourDisplayText.appendChild(text);
    document.getElementById("display").appendChild(ourDisplayText);
  }

  addLocalStorage();
}

/**********************************
 *        Local Storage
 *********************************/
function addLocalStorage() {
  tasksArr = JSON.stringify(tasksArr);
  localStorage.setItem(todoWebApp, tasksArr);
  tasksArr = JSON.parse(localStorage.getItem(todoWebApp));
}
// let myStorage = localStorage.setItem("Tasks",tasksArr);
