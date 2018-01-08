const todoList = ['Fazer isto', 'Fazer aquilo', 'Acabar a coisa', 'Fazer isto', 'Fazer aquilo', 'Acabar a coisa'];

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById("list");
  buildMenuFromList(list, todoList);
  console.log(list)

});

const buildMenuFromList = (context, stringList) => (
  stringList.map(item => {
    const listItem = createCustomElementLi();
    createCustomElementLink(listItem, item);
    context.appendChild(listItem);
  })
);

const createCustomElementLi = () => (
  document.createElement('LI')
)

const createCustomElementLink = (context, text) => {
  const linkItem = document.createElement('a');
  linkItem.classList.add('small');
  linkItem.classList.add('macos-font-color');
  linkItem.textContent = text;
  createIconButton(linkItem, ['fa', 'fa-times'], deleteTodo);
  createIconButton(linkItem, ['fa', 'fa-check'], toggleTodo);
  context.appendChild(linkItem);
}

const createIconButton = (context, cssClassList, action) => {
  const span = createSpan(cssClassList, action);
  context.appendChild(span);
}

const createSpan = (cssClassList, action) => {
  const span = document.createElement('SPAN');
  span.onclick = action;
  for (i of cssClassList) {
    span.classList.add(i);
  }
  return span;
}

const deleteTodo = () => {
  console.log('delete todo');
}

const toggleTodo = () => {
  console.log('toggle todo');
}
