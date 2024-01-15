'use strict'

const form = document.querySelector('#form');
const tasksTableList = document.querySelector('.tasks-table-list');
const input = document.querySelector('.field__input');
const selectElement = document.querySelector('.priority-select');

form.addEventListener('submit', addTask);

tasksTableList.addEventListener('click', deleteTask);

tasksTableList.addEventListener('click', statusTask);


const currentDate = new Date();
const options = { day: 'numeric', month: 'long', year: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('ru-RU', options);

function addTask(event) {
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
    input.value = '';
    input.focus();
}

function deleteTask(event) {
    if (event.target.dataset.action === 'delete') {
        const parentElement = event.target.closest('.tasks-table-item')
        parentElement.remove()
    }
}

function statusTask(event) {
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
