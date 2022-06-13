/*************************
 * TODAY'S DATE
 *************************/

const date = new Date();
let dateHeader = date.toDateString();

const todaysDate = document.querySelector("#headerDate");
todaysDate.innerHTML = dateHeader;

/*************************
 * VARIABLES
 *************************/

let inputText;
let inputDate;
let tasksArr = [];
const todoWebApp = "todo-web-app";

function addUser() {
  inputText = document.getElementById("userInput").value;
  inputDate = document.getElementById("dateHeading").value;

  tasksArr.push(inputText,inputDate);

  document.getElementById("display").innerHTML = "";

  if (inputText !== "") {
    for (let i = 0; i < tasksArr.length; i++) {
      const ourDisplayText = document.createElement("h5");
      const text = document.createTextNode(tasksArr[i]);
      ourDisplayText.appendChild(text);
      document.getElementById("display").appendChild(ourDisplayText);
    }
  } else if (inputText === "") {
    alert("Please add a task!");
  }

  addLocalStorage();
}

/**********************************
 *   Sort Tasks Alphabetically
 *********************************/
function sortTaskArr() {
  document.getElementById("display").innerHTML = "";

  tasksArr.sort();

  for (let i = 0; i < tasksArr.length; i++) {
    const ourDisplayText = document.createElement("h5");
    const text = document.createTextNode(tasksArr[i]);
    ourDisplayText.appendChild(text);
    document.getElementById("display").appendChild(ourDisplayText);
  }
}

/**********************************
 *        Local Storage
 *********************************/
function addLocalStorage() {
  tasksArr = JSON.stringify(tasksArr);
  localStorage.setItem(todoWebApp, tasksArr);
  tasksArr = JSON.parse(localStorage.getItem(todoWebApp));
}

/**********************************
 *     Clear Local Storage
 *********************************/

function clearLS() {
  localStorage.clear();
  tasksArr = [];
  document.getElementById("display").innerHTML = " ";
}
