let inputText;
let tasksArr = [];

function addUser() {
  // document.getElementById("display").innerHTML += (' ')

  inputText = document.getElementById("userInput").value;
  tasksArr.push(inputText);

  for(let i = 0; i < tasksArr.length; i++){
     
    let ourDisplayText = document.createElement("h5");
    let text = document.createTextNode(tasksArr);
    ourDisplayText.appendChild(text);
    document.getElementById("display").appendChild(ourDisplayText);
  }

}
