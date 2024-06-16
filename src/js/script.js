const input = document.getElementById("task-input");
const tasksList = document.querySelector(".todo-list");
const itemsLeft = document.querySelector(".items-left");
const tasksFilters = document.querySelector(".task-bar__filter");
const clearTasks = document.querySelector(".clear-tasks");

let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

input.addEventListener("keypress", addTask);
tasksList.addEventListener("click", event => {
	if (event.target.dataset.action === "delete") deleteTask(event);
	if (event.target.tagName === "INPUT") toggleTaskCompletion(event);
});
tasksFilters.addEventListener("click", filterTasks);
clearTasks.addEventListener("click", clearCompletedTasks);

function addTask(event) {
	const taskText = input.value.trim();

	if (event.key === "Enter" && taskText !== "") {
		const newTask = {
			id: Date.now(),
			text: taskText,
			isDone: false,
		};

		tasksArray.push(newTask);
		tasksList.insertAdjacentHTML("beforeend", createTaskElement(newTask));

		input.value = "";
		updateTaskCount();
		saveToLocalStorage();
	}
}

function createTaskElement(task) {
	const { id, text, isDone } = task;
	const isCheked = isDone ? "checked" : "";

	return `
	<li class="todo-list__item" id="${id}">
	<label>
	<input type="checkbox" ${isCheked} />
	<div class="todo-list__checkmark"></div>
	<span>${text}</span>
	</label>
	<div class="todo-list__remove-item" data-action="delete"></div>
	</li>
	`;
}

function deleteTask(event) {
	const { parentNode, index } = getTaskInfo(event);
	tasksArray.splice(index, 1);

	parentNode.remove();
	updateTaskCount();
	saveToLocalStorage();
}

function toggleTaskCompletion(event) {
	const { index } = getTaskInfo(event);
	tasksArray[index].isDone = !tasksArray[index].isDone;
	saveToLocalStorage();
}

function getTaskInfo(event) {
	const parentNode = event.target.closest("li");
	const index = tasksArray.findIndex(task => task.id === Number(parentNode.id));
	return { parentNode, index };
}

function clearCompletedTasks() {
	const doneTasks = filteredArrays().completed;
	doneTasks.forEach(task => {
		document.getElementById(`${task.id}`).remove();
	});

	tasksArray = filterArrays().active;
	updateTaskCount();
	saveToLocalStorage();
}

function filterTasks() {
	const radioInput = document.querySelector(`input[name="filter"]:checked`);

	const filteredTasks = filterArrays()[radioInput.id] || [];
	renderTasks(filteredTasks);
}

function filterArrays() {
	return {
		all: tasksArray,
		active: tasksArray.filter(task => !task.isDone),
		completed: tasksArray.filter(task => task.isDone),
	};
}

function renderTasks(array = tasksArray) {
	tasksList.innerHTML = "";
	if (array.length > 0) {
		array.forEach(task =>
			tasksList.insertAdjacentHTML("beforeend", createTaskElement(task))
		);
	}
	updateTaskCount();
}

function updateTaskCount() {
	itemsLeft.innerText = `${tasksList.childElementCount} items left`;
}

function saveToLocalStorage() {
	localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
