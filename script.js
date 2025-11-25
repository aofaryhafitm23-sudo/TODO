const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveToStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function newTodo() {
  const text = prompt("Введіть назву задачі:");

  if (!text || text.trim() === "") return;

  const todo = {
    id: Date.now(),
    text: text.trim(),
    checked: false
  };

  todos.push(todo);
  saveToStorage();
  render(todos);
  updateCounter();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveToStorage();
  render(todos);
  updateCounter();
}

function checkTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, checked: !todo.checked } : todo
  );
  saveToStorage();
  render(todos);
  updateCounter();
}

function renderTodo(todo) {

  const checkedClass = todo.checked
    ? 'text-success text-decoration-line-through'
    : '';

  return `
    <li class="list-group-item">
      <input
        type="checkbox"
        class="form-check-input me-2"
        id="${todo.id}"
        ${todo.checked ? "checked" : ""}
        onclick="checkTodo(${todo.id})"
      />

      <label for="${todo.id}">
        <span class="${checkedClass}">${todo.text}</span>
      </label>

      <button
        class="btn btn-danger btn-sm float-end"
        onclick="deleteTodo(${todo.id})"
      >
        delete
      </button>
    </li>
  `;
}

function render(todos) {
  list.innerHTML = "";
  todos
    .map(todo => renderTodo(todo))
    .forEach(html => list.insertAdjacentHTML("beforeend", html));
}

function updateCounter() {
  itemCountSpan.innerText = todos.length;
  uncheckedCountSpan.innerText = todos.filter(t => !t.checked).length;
}

render(todos);
updateCounter();
