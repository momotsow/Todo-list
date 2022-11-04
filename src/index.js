import './style.css';
import edit from './edit.js' //eslint-disable-line
export const taskSection = document.querySelector('.tasks');
const userTask = document.querySelector('.user-task');
const clearAllCompleted = document.querySelector('.clearAll');
export let todos = JSON.parse(localStorage.getItem('task')) || [];//eslint-disable-line
let MOOD = 'CREATE';
let tmp;
class Task {
  constructor(userTask) {
    this.id = todos.length + 1;
    this.task = userTask.value;
    this.status = false;
  }
}

const fillTasksList = (todos) => {
  todos = todos.sort((a, b) => a.index - b.index);
  document.getElementById('todolist').innerHTML = '';
  todos.forEach((element) => {
    document.getElementById('todolist').innerHTML += `
    <li class="task" id="${element.index}">
      <span>
      <input type="checkbox" id="check${element.index}" class=${element.completed ? 'inputChecked' : ''} ${element.completed ? 'checked' : ''}>
      <label for="check${element.index}" class=${element.completed ? 'labelChecked' : ''}>${element.description}</label>
      </span>
      <span class="hamburger" id="button${element.index}">&#8942;</span>
      </li>
    `;
  });
};


// const displayTask = (todos) => {
//   taskSection.innerHTML = '';
//   for (let i = 0; i < todos.length; i += 1) {
//     taskSection.innerHTML += `
//   <div class="one-task" id=${i}>
//     <div class="data">
//       <input id=${i} class="checkBoxClass" type="checkbox" ${
//   todos[i].status ? 'checked' : ''
// }>
//       <p id=${i} class="${todos[i].status ? 'checked' : ''} description">${
//   todos[i].task
// }</p>
//     </div>
//     <span class="span">&cross;</span>
//   </div>
//   `;
//   }
// };

const addTask = () => {
  if (MOOD === 'CREATE') {
    const task = new Task(userTask);
    todos.push(task);
    localStorage.setItem('task', JSON.stringify(todos));
    displayTask(todos);
    userTask.value = '';
  } else {
    todos[tmp].task = userTask.value;
    localStorage.setItem('task', JSON.stringify(todos));
    displayTask(todos);
    userTask.value = '';
    MOOD = 'CREATE';
    userTask.blur();
  }
};

userTask.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 && userTask.value !== '') {
    e.preventDefault();
    addTask();
  }
});

displayTask(todos);
const updateIndex = () => {
  for (let i = 0; i < todos.length; i += 1) {
    todos[i].id = i + 1;
  }
  todos.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  });
};

taskSection.addEventListener('click', (e) => {
  if (e.target.classList.contains('span')) {
    todos.splice(e.target.parentElement.id, 1);
    displayTask(todos);
    updateIndex();
    localStorage.setItem('task', JSON.stringify(todos));
  }

  if (e.target.classList.contains('description')) {
    userTask.focus();
    userTask.value = e.target.innerHTML;
    MOOD = 'UPDATE';
    tmp = e.target.id;
  }
});

edit();
clearAllCompleted.addEventListener('click', () => {
  todos = todos.filter((task) => task.status === false);
  displayTask(todos);
  updateIndex();
  localStorage.setItem('task', JSON.stringify(todos));
});

window.addEventlistener('load', () => {
  const tasks = [{ description: 'wash the dishes', completed: false, index: 0 },
    { description: 'complete To do list', completed: true, index: 1 }];
  fillTasksList(tasks);
});