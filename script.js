'use strict'

const form = document.querySelector('#form');
const tasksTableList = document.querySelector('.tasks-table-list');
const input = document.querySelector('.field__input');
const selectElement = document.querySelector('.priority-select');
const highCheckbox = document.getElementById('high');
const mediumCheckbox = document.getElementById('medium');
const lowCheckbox = document.getElementById('low');

form.addEventListener('submit', addTask);

tasksTableList.addEventListener('click', deleteTask);

tasksTableList.addEventListener('click', toggleTaskDoneStatus);


const currentDate = new Date();
const options = { day: 'numeric', month: 'long', year: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('ru-RU', options);

function addTask(event) {
    if (input.value !== '') {
        event.preventDefault();
        const taskHTML = `
    <tr class="tasks-table-item">
        <td class="title">${input.value}</td>
        <td class="start-date">${formattedDate}</td>
        <td class="end-date">${formattedDate}</td>
        <td class="priority">${selectElement.value}</td>
        <td>
            <button data-action="done" class="btn done">Выполнено</button>
            <button data-action="cancel" class="btn cancel">Отменить</button>
            <button data-action="delete" class="btn delete">Удалить</button>
        </td>
    </tr>`;

        tasksTableList.insertAdjacentHTML('beforeend', taskHTML);

        const newTaskRow = tasksTableList.lastElementChild;

        applyPriorityColor(newTaskRow.querySelector('.priority'), selectElement.value);

        input.value = '';
        input.focus();
    } else {
        event.preventDefault();
    }
}

function applyPriorityColor(element, priority) {
    switch (priority) {
        case 'High':
            element.style.color =  '#FF0000';
            break;
        case 'Medium':
            element.style.color = '#FFA500';
            break;
        case 'Low':
            element.style.color ='#0000FF';
            break;
        default:
            break;
    }
}

function deleteTask(event) {
    if (event.target.dataset.action === 'delete') {
        const parentElement = event.target.closest('.tasks-table-item')
        parentElement.remove()
    }
}

function toggleTaskDoneStatus(event) {
    const doneText = ['.title', '.start-date', '.end-date', '.priority'];
    const parentElement = event.target.closest('.tasks-table-item');
    const action = event.target.dataset.action;

    if (action === 'done' || action === 'cancel') {
        doneText.forEach(el => {
            const method = action === 'done' ? 'add' : 'remove';
            parentElement.querySelector(el).classList[method]('text-done');
        });
    }
}

highCheckbox.addEventListener('change', filterTasksPriority);
mediumCheckbox.addEventListener('change', filterTasksPriority);
lowCheckbox.addEventListener('change', filterTasksPriority);

function filterTasksPriority() {
    const tasks = document.querySelectorAll('.tasks-table-item');

    const isHighChecked = highCheckbox.checked;
    const isMediumChecked = mediumCheckbox.checked;
    const isLowChecked = lowCheckbox.checked;

    tasks.forEach(task => {
        const priorityElement = task.querySelector('.priority');
        const priority = priorityElement.textContent;

        const isVisible = (!isHighChecked && !isMediumChecked && !isLowChecked) ||
            (priority === 'High' && isHighChecked) ||
            (priority === 'Medium' && isMediumChecked) ||
            (priority === 'Low' && isLowChecked);

        task.style.display = isVisible ? 'table-row' : 'none';
    });
}
