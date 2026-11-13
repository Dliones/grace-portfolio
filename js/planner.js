// planner.js - Academic Planner: add, complete, delete tasks

// The array that holds every task. Each task is an object.
let tasks = JSON.parse(localStorage.getItem('graceTasks')) || [];

const form = document.getElementById('taskForm');
const titleInput = document.getElementById('taskTitle');
const dueInput = document.getElementById('taskDue');
const priorityInput = document.getElementById('taskPriority');
const listEl = document.getElementById('taskList');
const countEl = document.getElementById('taskCount');
const formError = document.getElementById('taskError');
const clearBtn = document.getElementById('clearDone');

// Save the array so tasks survive a page refresh
function saveTasks() {
  localStorage.setItem('graceTasks', JSON.stringify(tasks));
}

// ADD a task
function addTask(title, due, priority) {
  const task = {
    id: Date.now(),          // unique id used later to find the task
    title: title,
    due: due,
    priority: priority,
    completed: false
  };
  tasks.push(task);
  saveTasks();
  renderTasks();
}

// COMPLETE (toggle) a task
function toggleTask(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  saveTasks();
  renderTasks();
}

// DELETE a task
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  saveTasks();
  renderTasks();
}

// Redraw the whole list from the array (dynamic content update)
function renderTasks() {
  listEl.innerHTML = '';

  if (tasks.length === 0) {
    listEl.innerHTML = '<li class="empty">No tasks yet. Add your first one above.</li>';
  }

  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'task ' + task.priority + (task.completed ? ' done' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', 'Mark "' + task.title + '" as completed');
    checkbox.addEventListener('change', function () {
      toggleTask(task.id);
    });

    const info = document.createElement('div');
    info.className = 'info';
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = task.title;       // textContent keeps user input safe
    info.appendChild(title);
    if (task.due) {
      const due = document.createElement('div');
      due.className = 'due';
      due.textContent = 'Due: ' + task.due + ' | Priority: ' + task.priority;
      info.appendChild(due);
    }

    const del = document.createElement('button');
    del.className = 'del';
    del.type = 'button';
    del.textContent = 'Delete';
    del.addEventListener('click', function () {
      li.classList.add('removing');       // play fade-out, then remove
      setTimeout(function () { deleteTask(task.id); }, 300);
    });

    li.append(checkbox, info, del);
    listEl.appendChild(li);
  });

  updateCount();
}

// Show how many tasks are done
function updateCount() {
  const done = tasks.filter(function (t) { return t.completed; }).length;
  countEl.textContent = done + ' of ' + tasks.length + ' tasks completed';
}

// Form submit
form.addEventListener('submit', function (event) {
  event.preventDefault();                  // stop the page reloading
  const title = titleInput.value.trim();
  if (title === '') {
    formError.textContent = 'Enter a task before adding it.';
    titleInput.classList.add('invalid');
    return;
  }
  formError.textContent = '';
  titleInput.classList.remove('invalid');
  addTask(title, dueInput.value, priorityInput.value);
  form.reset();
  titleInput.focus();
});

// Remove all completed tasks at once
clearBtn.addEventListener('click', function () {
  tasks = tasks.filter(function (t) { return !t.completed; });
  saveTasks();
  renderTasks();
});

renderTasks();
