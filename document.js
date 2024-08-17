document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.task');

    tasks.forEach(task => {
        task.addEventListener('dragstart', handleDragStart);
        task.addEventListener('dragend', handleDragEnd);
    });

    const columns = document.querySelectorAll('.project-column');

    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
    });
});

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    const column = e.target.closest('.project-column');
    if (column) {
        column.classList.add('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    const column = e.target.closest('.project-column');
    if (column) {
        const draggingTask = document.querySelector('.dragging');
        column.classList.remove('drag-over');
        if (draggingTask) {
            column.appendChild(draggingTask);
            draggingTask.classList.remove('dragging');
        }
    }
}

// Use Google Apps Script client-side API to call functions
google.script.run.withSuccessHandler(function(tasks) {
  // Handle tasks data
}).getTasks();

function updateTask(taskId, columnId) {
  google.script.run.updateTask(taskId, columnId);
}
