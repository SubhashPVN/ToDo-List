
    const taskInput = document.getElementById('add');
    const addTaskButton = document.getElementById('btn');
    const taskList = document.getElementById('list');
    const totalTasksCounter = document.getElementById('tasks-counter');
    const completedTasksCounter = document.getElementById('c-count');
    const filterAll = document.getElementById('all');
    const filterRemaining = document.getElementById('rem');
    const filterCompleted = document.getElementById('com');
    const completeAllButton = document.getElementById('complete-all');
    const clearCompletedButton = document.getElementById('clear-all');

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', taskList.innerHTML);
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            taskList.innerHTML = tasks;
        }
        updateCounters();
    }

    // Function to update counters
    function updateCounters() {
        const totalTasks = document.querySelectorAll('#list li').length;
        const completedTasks = document.querySelectorAll('#list li.completed').length;
        totalTasksCounter.textContent = totalTasks;
        completedTasksCounter.textContent = completedTasks;
    }

    // Add task function
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <input type="checkbox" class="custom-checkbox">
            <label>${taskText}</label>
            <img src="Files/Delete.png" width=20px class="delete" />
        `;
        taskList.appendChild(taskItem);
        taskInput.value = '';
        saveTasks(); // Save tasks to localStorage
        updateCounters();
    }

    // Other functions for deleting, toggling completion, completing all, clearing completed, and filtering...
    function deleteTask(taskItem) {
        taskItem.remove();
        saveTasks(); // Save tasks to localStorage
        updateCounters();
    }

    function toggleTaskCompletion(taskItem) {
        taskItem.classList.toggle('completed');
        saveTasks(); // Save tasks to localStorage
        updateCounters();
    }

    function completeAllTasks() {
        const tasks = document.querySelectorAll('#list li');
        tasks.forEach(task => {
            task.classList.add('completed');
        });
        saveTasks(); // Save tasks to localStorage
        updateCounters();
    }

    function clearCompletedTasks() {
        const completedTasks = document.querySelectorAll('#list li.completed');
        completedTasks.forEach(task => {
            task.remove();
        });
        saveTasks(); // Save tasks to localStorage
        updateCounters();
    }

    function filterAllTasks() {
        document.querySelectorAll('#list li').forEach(task => {
            task.style.display = 'flex';
        });
    }

    function filterRemainingTasks() {
        document.querySelectorAll('#list li').forEach(task => {
            if (!task.classList.contains('completed')) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    }

    function filterCompletedTasks() {
        document.querySelectorAll('#list li').forEach(task => {
            if (task.classList.contains('completed')) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    }

    // Add event listeners
    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.type === 'checkbox') {
            toggleTaskCompletion(target.parentElement);
        } else if (target.classList.contains('delete')) {
            deleteTask(target.parentElement);
        }
    });
    completeAllButton.addEventListener('click', completeAllTasks);
    clearCompletedButton.addEventListener('click', clearCompletedTasks);
    filterAll.addEventListener('click', filterAllTasks);
    filterRemaining.addEventListener('click', filterRemainingTasks);
    filterCompleted.addEventListener('click', filterCompletedTasks);

    // Load tasks when the page is loaded
    loadTasks();

