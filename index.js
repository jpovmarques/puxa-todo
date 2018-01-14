const db = new PouchDB('todos');
const uuidv4 = require('uuid/v4');

function create(id, text) {
  const todo = {
    _id: id,
    created: Date.now(),
    title: '',
    completed: false,
  };
  db.put(todo);
}

function updateText(todo, text) {
  const newTodo = {
    _id: todo._id,
    _rev: todo._rev,
    created: todo.created,
    title: text,
    completed: todo.completed,
  };
  db.put(newTodo);
}

function updateState(todo) {
  const newTodo = {
    _id: todo._id,
    _rev: todo._rev,
    created: todo.created,
    title: todo.title,
    completed: !todo.completed,
  };
  db.put(newTodo);
}

function addTodo() {
  // create(uuidv4());
  create(String(Date.now()))
}

function updateTodo(todo, text) {
  updateText(todo, text);
}

function deleteTodo(todo) {
  db.remove(todo);
}

function toggleTodo(todo) {
  updateState(todo);
}

function changeInputState(input, todo) {
  input.disabled = false;
  input.value = todo.title;
  input.select();
}

function onFocusTodo(input, todo) {
  changeInputState(input, todo);
}

function onBlurTodo(input, todo) {
  updateTodo(todo, input.value);
  input.disabled = false;
}

function onSubmitTodo(event, input, todo) {
  const key = event.which || event.keyCode;
    if (key === 13) { 
      input.blur();
      input.disabled = false;
    }
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const createTopListItem = () => {
  const li = document.createElement('LI');
  li.classList.add("disabled");
  li.classList.add("menu-item-top");
  const a = document.createElement('a');
  a.id = "message"
  a.classList.add('small');
  a.text = `You have 0 tasks.`;

  li.appendChild(a);

  return li;
}

const createBottomListItem = () => {
  const li = document.createElement('LI');
  li.classList.add("disabled");
  li.classList.add("menu-item-top");
  const a = document.createElement('a');
  a.classList.add('small');
  a.classList.add('plus-height');
  a.classList.add('plus-link');

  const addSpan = document.createElement('SPAN');
  addSpan.addEventListener('click', addTodo.bind(this));
  addSpan.classList.add('fa');
  addSpan.classList.add('fa-plus');
  addSpan.classList.add('menu-item-top');

  a.appendChild(addSpan);
  li.appendChild(a);

  return li;
}

const createTodoListItem = (todo) => {
  const li = document.createElement('LI');

  const input = document.createElement('input');
  input.addEventListener('focus', onFocusTodo.bind(this, input, todo));
  input.addEventListener('blur', onBlurTodo.bind(this, input, todo));
  input.addEventListener('keypress', (e) => { onSubmitTodo(e, input, todo) });
  input.type = 'text';
  input.border = 'none';

  let todoTitle = todo.title;

  if (todoTitle.length >= 37) {
    todoTitle = todoTitle.substring(0, 35) + '...';
  }

  input.value = capitalizeFirstLetter(todoTitle);
  input.size = 34;

  if (todoTitle === '') {
    input.value = 'Write your task...';
    input.classList.add('fade-icon');
  }

  const a = document.createElement('a');
  a.classList.add('small');
  a.classList.add('macos-font-color');

  const deleteSpan = document.createElement('SPAN');
  deleteSpan.id = "delete-icon";
  deleteSpan.addEventListener('click', deleteTodo.bind(this, todo));
  deleteSpan.classList.add('fa');
  deleteSpan.classList.add('fa-times');
  deleteSpan.classList.add('transparent');

  const addSpan = document.createElement('SPAN');
  addSpan.addEventListener('click', toggleTodo.bind(this, todo));
  addSpan.classList.add('fa');
  addSpan.classList.add('fa-check-circle');

  if (!todo.completed) {
    addSpan.classList.add('fade-icon');
  } 

  a.appendChild(addSpan);
  a.appendChild(input);
  a.appendChild(deleteSpan);
  li.appendChild(a);

  return li;
}

const redrawTodosUI = (allTodos) => {
  let count = 0;
  const ul = document.getElementById('list');
  ul.innerHTML = '';
  ul.appendChild(createTopListItem());

  allTodos.forEach((todo) => {
    if (!todo.doc.completed) {
      const a = document.getElementById('message');
      count += 1;
      a.text = `You have ${count} tasks to finish.`;
    }
    ul.appendChild(createTodoListItem(todo.doc));
  });
  ul.appendChild(createBottomListItem());
}

const showAllTodos = () => {
  db.allDocs({include_docs: true, descending: false}, function(err, doc) {
    redrawTodosUI(doc.rows);
  });
}

db.changes({
  since: 'now',
  live: true
}).on('change', showAllTodos);

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById("list");
  showAllTodos();
});
