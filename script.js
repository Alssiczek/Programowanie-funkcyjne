let tasks = [];

// Funkcja dodaje nowe zadanie do listy zadań.
// Wykorzystuje programowanie funkcyjne poprzez tworzenie nowej instancji tablicy zamiast modyfikowania istniejącej.
function addTask(tasks, task) {
    return [...tasks, { id: tasks.length + 1, task: task, completed: false }];
}

// Funkcja zmienia stan 'completed' dla zadania o podanym ID.
// Używa metody 'map', która jest przykładem funkcji w programowaniu funkcyjnym, tworząc nową tablicę z zaktualizowanymi elementami.
function toggleTaskCompletion(tasks, taskId) {
    return tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
}

// Funkcja filtruje i zwraca zadania, które są zakończone.
// Używa 'filter', kolejnej funkcji w programowaniu funkcyjnym, do stworzenia nowej tablicy zawierającej tylko zakończone zadania.
function filterCompletedTasks(tasks) {
    return tasks.filter(task => task.completed);
}

// Funkcja filtruje i zwraca zadania, które nie są zakończone.
// Podobnie jak 'filterCompletedTasks', używa 'filter' do stworzenia nowej tablicy, tym razem z zadaniami, które nie są jeszcze zakończone.
function filterPendingTasks(tasks) {
    return tasks.filter(task => !task.completed);
}

// Funkcja przyjmuje listę zadań do wyświetlenia.
// Każde zadanie jest przekształcane w element listy (LI), co jest przykładem wykorzystania funkcji mapowania DOM na strukturę danych.
function renderTasks(tasksToShow) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';  // Czyści istniejącą listę przed ponownym renderowaniem
    tasksToShow.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.task;
        taskItem.className = task.completed ? 'completed' : ''; 
        taskItem.onclick = () => {
            tasks = toggleTaskCompletion(tasks, task.id);
            renderTasks(tasks);  // Renderuje wszystkie zadania 
        };
        taskList.appendChild(taskItem);
    });
}

// Funkcja obsługuje dodanie nowego zadania po kliknięciu przycisku. Sprawdza, czy pole input nie jest puste, i aktualizuje listę zadań.
function handleAddTask() {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() !== '') {
        tasks = addTask(tasks, taskInput.value);
        taskInput.value = '';
        renderTasks(tasks);  // Odświeża widok wszystkich zadań
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addButton').onclick = handleAddTask;
    document.getElementById('filterAll').onclick = () => renderTasks(tasks);
    document.getElementById('filterCompleted').onclick = () => renderTasks(filterCompletedTasks(tasks));
    document.getElementById('filterPending').onclick = () => renderTasks(filterPendingTasks(tasks));
    renderTasks(tasks);  
});