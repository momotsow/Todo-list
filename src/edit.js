import { taskSection, todos } from './index.js'//eslint-disable-line

export default function change() {
  taskSection.addEventListener('change', (event) => {
    if (event.target.className === 'checkBoxClass') {
      todos[event.target.id].status = !todos[event.target.id].status;
      localStorage.setItem('task', JSON.stringify(todos));
      event.target.parentElement.classList.toggle('checked');
    }
  });
}