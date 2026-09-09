const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const STORAGE_KEY = 'simple-app-tasks';

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTaskItem(task) {
  const li = document.createElement('li');
  li.className = `task-item ${task.done ? 'done' : ''}`;

  const main = document.createElement('div');
  main.className = 'task-main';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;
  checkbox.className = 'task-checkbox';
  checkbox.setAttribute('aria-label', `Mark ${task.text} done`);
  checkbox.addEventListener('change', () => {
    task.done = checkbox.checked;
    saveTasks();
    renderTasks();
  });

  const text = document.createElement('span');
  text.className = 'task-text';
  text.textContent = task.text;

  main.appendChild(checkbox);
  main.appendChild(text);

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    tasks = tasks.filter((item) => item.id !== task.id);
    saveTasks();
    renderTasks();
  });

  li.appendChild(main);
  li.appendChild(deleteBtn);
  return li;
}

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = 'No tasks yet. Add one above.';
    taskList.appendChild(empty);
    return;
  }

  tasks.forEach((task) => {
    taskList.appendChild(createTaskItem(task));
  });
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (!text) {
    return;
  }

  tasks.unshift({
    id: Date.now().toString(),
    text,
    done: false,
  });

  taskInput.value = '';
  saveTasks();
  renderTasks();
});

renderTasks();
