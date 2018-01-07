const todoList = ['Fazer isto', 'Fazer aquilo', 'Acabar a coisa', 'Fazer isto', 'Fazer aquilo', 'Acabar a coisa'];

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById("list");
  buildListFromArray(todoList);
});

const buildListFromArray = array => (
  array.map(item => {
    const listItem = createCustomElementLi();
    const linkItem = createCustomElementLink(item);

    list.appendChild(listItem);
    listItem.appendChild(linkItem);
  })
);

const createCustomElementLi = () => (
  document.createElement("LI")
)

const createCustomElementLink = (text) => {
  const linkItem = document.createElement("a");
  linkItem.classList.add('small');
  linkItem.classList.add('macos-font-color');
  linkItem.textContent = text;
  return linkItem;
}
