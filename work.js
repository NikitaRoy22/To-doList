const input = document.querySelector("#input");
const add = document.querySelector("#addList");
const todoList = document.querySelector(".to-do")

add.addEventListener("click", ToDo);
todoList.addEventListener("click", delList);
todoList.addEventListener("click", checkList);
document.addEventListener("DOMContentLoaded", getSave);
 
function ToDo(event) {
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = input.value;
    newTodo.classList.add("todo-element");
    todoDiv.appendChild(newTodo);

    localSave(input.value);

    boxTitle=document.getElementById("box-title");
    if(boxTitle){
        boxTitle.remove();
    }

    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check-circle"></i>'
    checkButton.classList.add("check");
    todoDiv.appendChild(checkButton);
    
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add("delete");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
    input.value = "";
}

function delList(event) {
    const item = event.target;

    if(item.classList[0] === "delete") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocal(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
            window.localStorage.removeItem("todo");
        });
    }
}

function checkList(event) {
    const item = event.target;

    if(item.classList[0] === "check") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function localSave(todo) {
    let todoSave;
    if (localStorage.getItem("todoSave") === null) {
        todoSave = [];
    }
    else {
        todoSave = JSON.parse(localStorage.getItem("todoSave"));
    }
    todoSave.push(todo);
    console.log(localStorage.getItem("todoSave"));
    localStorage.setItem("todoSave", JSON.stringify(todoSave));
}

function getSave() {
    let todoSave;
    if (localStorage.getItem("todoSave") === null) {
        todoSave = [];
    }
    else {
        todoSave = JSON.parse(localStorage.getItem("todoSave"));
    }
    console.log(todoSave);
    for(i=0; i<todoSave.length; i++){
        todo=todoSave[i];
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-element");
        todoDiv.appendChild(newTodo);

        boxTitle=document.getElementById("box-title");
        if(boxTitle){
            boxTitle.remove();
        }

        const checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class="fas fa-check-circle"></i>'
        checkButton.classList.add("check");
        todoDiv.appendChild(checkButton);
        
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
        deleteButton.classList.add("delete");
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
    }
}

function removeLocal(todo) {
    let todoSave;
    if (localStorage.getItem("todoSave") === null) {
        todoSave = [];
    }
    else {
        todoSave = JSON.parse(localStorage.getItem("todoSave"));
    }
    const todoIndex = todo.children[0].innerText;
    todoSave.splice(todoSave.indexOf(todoIndex), 1);
    localStorage.setItem("todoSave", JSON.stringify(todoSave));
}