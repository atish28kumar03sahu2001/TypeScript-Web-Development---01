import './style.css';

interface ToDo {
  title: string,
  isCompleted: boolean,
  readonly id: string,
}

let ToDoAr: ToDo[] = JSON.parse(localStorage.getItem('todos') || '[]');
const todoContainer = document.getElementById("List") as HTMLDivElement;
const TodoInput = document.getElementById("IP") as HTMLInputElement;
const Submit = document.getElementById("Submit") as HTMLInputElement;

// Event listener for the submit button
Submit.addEventListener("click", (event) => {
  event.preventDefault();
  if (TodoInput.value.trim() === "") return;

  const todo: ToDo = {
    title: TodoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000)
  }

  ToDoAr.push(todo);
  localStorage.setItem('todos', JSON.stringify(ToDoAr));
  TodoInput.value = "";

  RenderTodo();
})

// Function to generate a to-do item element
const generateToDoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "LST-TODO";

  // Check Box
  const Check: HTMLInputElement = document.createElement("input");
  Check.setAttribute("type", "checkbox");
  Check.className = "LST-CHK";
  Check.checked = isCompleted;
  Check.onchange = () => {
    const item = ToDoAr.find(item => item.id === id);
    if (item) {
      item.isCompleted = Check.checked;
      localStorage.setItem('todos', JSON.stringify(ToDoAr));
    }
    P.className = Check.checked ? "TextCut" : "";
  }

  // P tag
  const P: HTMLParagraphElement = document.createElement("p");
  P.className = isCompleted ? "TextCut" : "";
  P.innerHTML = `${title}`;

  // Button
  const DELB: HTMLButtonElement = document.createElement("button");
  DELB.className = "LST-DEL";
  DELB.textContent = "X";
  DELB.onclick = () => {
    deleteTodo(id);
  }

  // Append Elements
  todo.append(Check, P, DELB);
  todoContainer.append(todo);
}

// Function to delete a to-do item
const deleteTodo = (id: string) => {
  ToDoAr = ToDoAr.filter(item => item.id !== id);
  localStorage.setItem('todos', JSON.stringify(ToDoAr));
  RenderTodo();
}

// Function to render the to-do list
const RenderTodo = () => {
  todoContainer.innerHTML = ToDoAr.length ? "" : "<p class='LP'>No ToDo Yet!</p>";
  ToDoAr.forEach(item => {
    generateToDoItem(item.title, item.isCompleted, item.id);
  });
}

// Initial render of the to-do list
RenderTodo();