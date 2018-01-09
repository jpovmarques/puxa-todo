const db = new PouchDB('todos');

function addTodo(text) {
  const todo = {
    _id: new Date().toISOString(),
    title: text,
    completed: false
  };
  db.put(todo);
}

addTodo('merge with develop')
addTodo('fix routing')
addTodo('refactor class')
addTodo('finish todo app')
addTodo('do presentation')
addTodo('merge with develop')
addTodo('fix routing')
addTodo('refactor class')
addTodo('finish todo app')
addTodo('do presentation')
addTodo('merge with develop')
addTodo('fix routing')
addTodo('refactor class')
addTodo('finish todo app')
addTodo('do presentation')

function deleteTodo(todo) {
  console.log('delete todo', todo);
  db.remove(todo);
}

function toggleTodo(todo) {
  console.log('toggle todo', todo);
}


const createTodoListItem = (todo) => {
  console.log('todo', todo);
  const li = document.createElement('LI');

  const a = document.createElement('a');
  a.classList.add('small');
  a.classList.add('macos-font-color');
  a.textContent = todo.title;

  const deleteSpan = document.createElement('SPAN');
  deleteSpan.id = todo._id;
  deleteSpan.addEventListener('click', deleteTodo.bind(this, todo));
  deleteSpan.classList.add('fa');
  deleteSpan.classList.add('fa-times');

  const addSpan = document.createElement('SPAN');
  addSpan.id = todo._id;
  addSpan.addEventListener('click', toggleTodo.bind(this, todo));
  addSpan.classList.add('fa');
  addSpan.classList.add('fa-check');

  a.appendChild(deleteSpan);
  a.appendChild(addSpan);
  li.appendChild(a);

  return li;
}

const redrawTodosUI = (allTodos) => {
  const ul = document.getElementById('list');
  ul.innerHTML = '';
  allTodos.forEach((todo) => {
    ul.appendChild(createTodoListItem(todo.doc));
  });
}

const showAllTodos = () => {
  db.allDocs({include_docs: true, descending: true}, function(err, doc) {
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
  console.log(list);
});
