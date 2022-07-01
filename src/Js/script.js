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
// modal
const dialog = document.querySelector("#modal");
const modalHeading = document.querySelector("#modalHeading");
const taskInputField = document.querySelector("#taskInput");
const taskdateInputField = document.querySelector("#taskDateInput");
const modalAddTaskBtn = document.querySelector("#btnAddNewTask");
const exitBtn = document.querySelector("#btnExit");
const addTaskBtn = document.querySelector("#btnAddTask");

// Variables
let tasksArr = [];
const todoWebApp = "todo-web-app";
const body = document.querySelector(".body");

// Edit Options
let editTaskEl = "";
let editTaskDateEl = "";
let editFlag = false;
let editId = "";

// Tasklist
const taskList = document.querySelector("#listTasks");

/*************************
 * CLASSES
 *************************/
class Task {
  constructor(taskid, taskname, taskdate) {
    this._taskid = taskid;
    this._taskname = taskname;
    this._taskdate = taskdate;
  }

  get taskid() {
    return this._taskid;
  }

  set taskid(newTaskId) {
    this._taskid = newTaskId;
  }

  get taskname() {
    return this._taskname;
  }

  set taskname(newTaskName) {
    this._taskname = newTaskName;
  }

  get taskdate() {
    return this._taskdate;
  }

  set taskdate(newTaskName) {
    this._taskdate = newTaskName;
  }
}

/*************************
 *Event Listener for Modal
 *************************/

// Modal opens with background blur
addTaskBtn.addEventListener("click", () => {
  dialog.showModal();
  body.classList.add("modal-open");
});

// Modal close
exitBtn.addEventListener("click", () => {
  dialog.close();
  body.classList.remove("modal-open");
});

// Add new task
modalAddTaskBtn.addEventListener("click", addTask);

/*************************
 *       Add Taks
 *************************/
function addTask(event) {
  // Prevents page reload
  event.preventDefault();

  // Stores userInput into variables
  let userInput = document.querySelector("#taskInput").value;
  let userInputDate = document.querySelector("#taskDateInput").value;

  // Creates a unique ID for each new task
  let newtaskId = new Date().getTime().toString();

  // Makes the first letter an Uppercase letter
  let userInputTask = userInput.charAt(0).toUpperCase() + userInput.slice(1);

  // If the input text is not empty and no tasks are being edited
  if (userInputTask !== "" && !editFlag) {
    // Instantiates a new object and combines the variables
    let newTask = new Task(newtaskId, userInputTask, userInputDate);

    // Adds the object to empty array
    tasksArr.push(newTask);

    // Creates a new list Element for the output display
    const listElement = document.createElement("LI");

    // Add class for styling
    listElement.classList.add("listItem");

    // Add ID
    const attr = document.createAttribute("data-id");
    attr.value = newtaskId;
    listElement.setAttributeNode(attr);

    // Adds the tasks to the list element with Template Literals
    listElement.innerHTML = `
    <div class="listTaskText">
      <i name="square-outline"></i>
      <p class="taskHeadingText">${newTask.taskname}</p>
      <p class="taskDateText">${newTask.taskdate}</p>
    </div>
    <div class="listTaskBtns">
      <button id="editTaskBtn" class="editTaskBtn">
      <i class="fa-solid fa-pencil"></i>
      </button>
      <button id="deleteTaskBtn" class="deleteTaskBtn">
      <i class="fa-solid fa-x"></i>
      </button>
    </div>`;

    // Variables created after a new task is created
    const taskText = listElement.querySelector(".listTaskText");
    const deleteBtn = listElement.querySelector("#deleteTaskBtn");
    const editBtn = listElement.querySelector("#editTaskBtn");

    // Event Listeners created after a new task is created
    deleteBtn.addEventListener("click", deleteTask);
    editBtn.addEventListener("click", editTask);

    // Adds list element to the DOM
    taskList.appendChild(listElement);

    // modal close
    dialog.close();
    body.classList.remove("modal-open");

    // Task Completed (this task will be striked through)
    taskText.addEventListener("click", function () {
      taskText.classList.toggle("listItemCompleted");
      listElement.classList.toggle("completed");
    });

    addLocalStorage();

    setBackToDefault();

    // If the task input field is not empty and the task is being edited
  } else if (userInputTask !== "" && editFlag) {
    editTaskEl.innerHTML = userInputTask;
    editTaskDateEl.innerHTML = userInputDate;

    // modal close
    dialog.close();
    body.classList.remove("modal-open");

    setBackToDefault();

    // If the task input field is empty
  } else {
    alert("Please enter a task!");
  }
}

/*************************
 * Delete Tasks From List
 *************************/

function deleteTask(event) {
  // Selects the task
  const element = event.currentTarget.parentElement.parentElement;

  // Accesses the tasks ID
  const id = element.dataset.id;

  // Removes the task
  taskList.removeChild(element);
}

/*************************
 *      Edit Tasks
 *************************/

function editTask(event) {
  // Selects the task
  const element = event.currentTarget.parentElement.parentElement;

  // Selects elements containing task name and date
  editTaskEl =
    event.currentTarget.parentElement.previousElementSibling.children[1];
  editTaskDateEl =
    event.currentTarget.parentElement.previousElementSibling.children[2];

  // Set input value to task name and date before edit
  taskInputField.value = editTaskEl.innerHTML;
  taskdateInputField.value = editTaskDateEl.innerHTML;

  // change modal heading
  modalHeading.innerHTML = "Edit task";

  // change edit option variable values
  editId = element.dataset.id;
  editFlag = true;

  // modal close
  dialog.showModal();
  body.classList.add("modal-open");
}

/**********************************
 *   Sort Tasks Alphabetically
 *********************************/
function sortTaskArr() {
  [...taskList.children]
    .sort((a, b) => (a.innerText > b.innerText ? 1 : -1))
    .forEach((node) => taskList.appendChild(node));
}

/**********************************
 *        Local Storage
 *********************************/
function addLocalStorage() {
  // Converts JavaScript Object into a valid JSON string and prepares it for local storage
  tasksArr = JSON.stringify(tasksArr);

  // Gives our local storage a key(A name) and a value(The user input value) and stores the values data under that name
  localStorage.setItem(todoWebApp, tasksArr);

  // Converts a JSON string back to a JavaScript Object and gets it back from local storage
  tasksArr = JSON.parse(localStorage.getItem(todoWebApp));
}

/**********************************
 *     Clear Local Storage
 *********************************/

function clearLS() {
  // Clears local Storage
  localStorage.clear();

  // Clears the Array and sets it back to its default
  tasksArr = [];

  // Clears the task list on the DOM
  document.getElementById("listTasks").innerHTML = " ";
}

/**********************************
 *   Set Modal back to Default
 *********************************/

function setBackToDefault() {
  taskInputField.value = "";
  taskdateInputField.value = "";
  editFlag = false;
  editId = "";
  modalHeading.innerHTML = "Add new task";
}
