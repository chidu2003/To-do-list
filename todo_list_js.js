document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded event fired');
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load tasks from local storage when the page loads
    loadTasks();

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('Form submitted');
        const taskText = input.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            input.value = '';
            saveTasks();
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span class="task-text">${taskText}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        todoList.appendChild(li);
    }

    todoList.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('delete-btn')) {
            target.parentElement.remove();
        } else if (target.classList.contains('edit-btn')) {
            const newText = prompt('Edit task:', target.parentElement.querySelector('.task-text').textContent);
            if (newText !== null && newText.trim() !== '') {
                target.parentElement.querySelector('.task-text').textContent = newText.trim();
            }
        } else if (target.classList.contains('task-checkbox')) {
            const taskText = target.nextElementSibling;
            if (target.checked) {
                taskText.classList.add('complete');
            } else {
                taskText.classList.remove('complete');
            }
        }
    });
    function saveTasks() {
        const tasks = [];
        todoList.querySelectorAll('li').forEach(function (task) {
            tasks.push({
                text: task.querySelector('.task-text').textContent,
                completed: task.querySelector('.task-checkbox').checked
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log('Tasks saved to local storage:', tasks);
    }
    
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log('Tasks loaded from local storage:', tasks);
        tasks.forEach(function (task) {
            addTask(task.text);
            const li = todoList.lastElementChild;
            if (task.completed) {
                li.querySelector('.task-checkbox').checked = true;
                li.querySelector('.task-text').classList.add('complete');
            }
        });
    }
    
});
