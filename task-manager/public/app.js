const API_URL = 'http://localhost:3000/tasks';

// Load tasks on page load
document.addEventListener('DOMContentLoaded', fetchTasks);

function fetchTasks() {
  fetch(API_URL)
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${task.title}</span>
          <button onclick="deleteTask(${task.id})">Delete</button>
          <button onclick="toggleTask(${task.id}, ${task.completed})">
            ${task.completed ? 'Undo' : 'Complete'}
          </button>
        `;
        taskList.appendChild(li);
      });
    })
    .catch(error => console.error('Error fetching tasks:', error));
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const title = taskInput.value.trim();
  if (!title) return;

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
    .then(response => response.json())
    .then(() => {
      taskInput.value = '';
      fetchTasks();
    })
    .catch(error => console.error('Error adding task:', error));
}

function deleteTask(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => fetchTasks())
    .catch(error => console.error('Error deleting task:', error));
}

function toggleTask(id, completed) {
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !completed })
  })
    .then(() => fetchTasks())
    .catch(error => console.error('Error updating task:', error));
}
