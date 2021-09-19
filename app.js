// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list'); 
// 'todoList' is the <ul> that contains <li> and buttons.
const filterOption = document.querySelector('.filter-todo'); 
 


// EventListeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
/* Notice the above line that we are adding the eventListener on the <ul> itself, not its childern (<li> and complete-btn and trash-btn), because its children will be created by the JS then inserted to the DOM.
*/
filterOption.addEventListener('change', filterTodo);


// Funcions
function addTodo(event) {
    event.preventDefault();
    
    if(todoInput.value !== ''){
        // Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value; 
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // ADD TODO to localStorage
        saveLocalTodos(todoInput.value);
        // Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        // Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        // Append the TodoDiv to the ul
        todoList.appendChild(todoDiv);

        // Clear todoInput Value
        todoInput.value = "";
    }
}

function deleteCheck(event) {
    // console.log(event.target);
    // console.log(event.target.parentElement);
    // console.log(event.target.parentElement.childNodes);
    // console.log(event.target.parentElement.childNodes[0]);
    // console.log(event.target.parentElement.childNodes[0].innerText);

    const item = event.target;
    // DELETE TODO
    if(item.classList[0] === 'trash-btn'){
        const todoDiv = item.parentElement;
        // Animation
        todoDiv.classList.add('fall');
        // Remove the todoDiv from the DOM only after the CSS transition ends
        removeLocalTodos(todoDiv); /* remove the text from the localStrotage */
        todoDiv.addEventListener('transitionend', function(){
            todoDiv.remove();
        });

    }
    // CHECK MARK
    if(item.classList[0] === 'complete-btn') {
        const todoDiv = item.parentElement;
        todoDiv.classList.toggle('completed');
    }
}
function filterTodo(event) {
    const todos = todoList.childNodes; /* will return a list of divs (div.todo) */

    switch(event.target.value){
        case "all":
            todos.forEach(function(todo) {
                todo.style.display = 'flex';
            });
            break;
        case "completed":
            todos.forEach(function(todo) {
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
            });
            break;
        case "uncompleted":
            todos.forEach(function(todo) {
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
            });
            break;
    }// end switch
}
function saveLocalTodos(todo) {
    // Check if I alraedy have things in there
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos() {
     // Check if I alraedy have things in there
     let todos;
     if(localStorage.getItem('todos') === null){
         todos = [];
     }
     else{
         todos = JSON.parse(localStorage.getItem('todos'))
     }
     todos.forEach(function(todo){    
        // Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo; 
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        // Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        // Append the TodoDiv to the ul
        todoList.appendChild(todoDiv);      
     });
}// end getTodos
function removeLocalTodos(todoDiv) {
     // Check if I alraedy have things in there
     let todos;
     if(localStorage.getItem('todos') === null){
         todos = [];
     }
     else{
         todos = JSON.parse(localStorage.getItem('todos'))
     }
     const todoText = todoDiv.children[0].innerText;
     todos.splice(todos.indexOf(todoText), 1); /* remove this text from the todos array */
     localStorage.setItem('todos', JSON.stringify(todos));
}