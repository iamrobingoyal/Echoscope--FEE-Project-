// Variables - Let and Const
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Arrays and Objects - State management
let tasks = [];

// JSON Handling - Loading from localStorage
const loadTasks = () => {
  const savedTasks = localStorage.getItem('echoscope_tasks');
  if (savedTasks) {
    // JSON Parsing
    tasks = JSON.parse(savedTasks);
  } else {
    // Default tasks using Array of Objects
    tasks = [
      { id: Date.now(), title: 'Study for 2 hours', completed: false },
      { id: Date.now() + 1, title: 'Avoid Doom Scrolling', completed: false },
      { id: Date.now() + 2, title: 'Review digital habits', completed: true }
    ];
  }
};

// JSON Handling - Saving to localStorage
const saveTasks = () => {
  // JSON Stringification
  localStorage.setItem('echoscope_tasks', JSON.stringify(tasks));
};

// Functions & Arrow Functions
const renderTasks = () => {
  // DOM Manipulation - clearing nodes
  taskList.innerHTML = '';

  // Higher-Order Functions: map
  tasks.map(task => {
    // Object Destructuring
    const { id, title, completed } = task;

    // DOM Manipulation - Creating Nodes
    const taskItem = document.createElement('div');
    taskItem.className = `task-item ${completed ? 'done' : ''}`;

    const checkbox = document.createElement('div');
    checkbox.className = `task-checkbox ${completed ? 'checked' : ''}`;
    
    // Event handling - Toggling completion
    checkbox.addEventListener('click', () => {
      toggleTask(id);
    });

    const taskTitle = document.createElement('div');
    taskTitle.className = 'task-title';
    taskTitle.textContent = title;

    const deleteBtn = document.createElement('div');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.marginLeft = 'auto';
    deleteBtn.style.fontSize = '1.2rem';
    deleteBtn.style.color = '#ef4444';
    
    // Event handling - Deleting task
    deleteBtn.addEventListener('click', () => {
      deleteTask(id);
    });

    // Appending nodes to DOM
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTitle);
    taskItem.appendChild(deleteBtn);
    
    taskList.appendChild(taskItem);
  });
};

// Event Handling & Form Validation
taskForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission page reload
  
  const title = taskInput.value.trim();
  
  // Form validation
  if (!title) {
    // BOM: Window alerts
    window.alert("Please enter a task title!");
    return;
  }

  const newTask = {
    id: Date.now(),
    title: title,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = ''; // Clear input
  
  saveTasks();
  renderTasks();
});

const showCustomAlert = (message) => {
  const alertBox = document.createElement('div');
  alertBox.className = 'custom-alert';
  alertBox.textContent = `✅ ${message}`;
  document.body.appendChild(alertBox);
  
  setTimeout(() => {
    alertBox.remove();
  }, 3000);
};

const toggleTask = (id) => {
  // Higher order functions: map
  tasks = tasks.map(task => {
    if (task.id === id) {
      const newStatus = !task.completed;
      if (newStatus) {
        showCustomAlert("Yay! You completed a task! Great job! 🌸✨");
      }
      return { ...task, completed: newStatus }; // Spread operator for deep copy/mutation avoidance
    }
    return task;
  });
  saveTasks();
  renderTasks();
};

const deleteTask = (id) => {
  // Higher order functions: filter
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
};

// Initial execution
loadTasks();
renderTasks();
