document.addEventListener("DOMContentLoaded",init);

function init(){
  var saveButton = document.querySelector("button");
  //var clearButton = document.querySelector("button")[1];
  saveButton.addEventListener("click",save);
}

function save(){
  alert(saySomething());
}