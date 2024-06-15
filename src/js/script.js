const input = document.getElementById("task-input");
const tasksList = document.querySelector(".todo-list");
const itemsLeft = document.querySelector(".items-left");
const clearTasks = document.querySelector(".clear-tasks");

let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];

const updateTaskCount = () =>
	(itemsLeft.innerText = `${tasksList.childElementCount} items left`);

const createTaskElement = task => {
	const isDone = task.isDone === true ? "checked" : "";
	return `
	<li class="todo-list__item" id="${task.id}">
	<label>
	<input type="checkbox" ${isDone} />
	<div class="todo-list__checkmark"></div>
	<span>${task.text}</span>
	</label>
	<div class="todo-list__remove-item" data-action="delete"></div>
	</li>
	`;
};

const renderTasks = () => {
	if (tasksArray.length > 0) {
		tasksArray.forEach(task =>
			tasksList.insertAdjacentHTML("beforeend", createTaskElement(task))
		);
	}
	updateTaskCount();
};
renderTasks();

const addTask = event => {
	const taskText = input.value.trim();

	if (event.key === "Enter" && taskText !== "") {
		const newTask = {
			id: Date.now(),
			text: taskText,
			isDone: false,
		};

		const taskTemplate = createTaskElement(newTask);

		tasksArray.push(newTask);
		tasksList.insertAdjacentHTML("beforeend", taskTemplate);
		input.value = "";

		updateTaskCount();
		localStorage.setItem("tasks", JSON.stringify(tasksArray));
	}
};

const getTaskInfo = event => {
	const parentNode = event.target.closest("li");
	const index = tasksArray.findIndex(task => task.id == parentNode.id);
	return { parentNode, index };
};

const deleteTask = event => {
	if (event.target.dataset.action === "delete") {
		const { parentNode, index } = getTaskInfo(event);
		tasksArray.splice(index, 1);

		parentNode.remove();
		updateTaskCount();
		localStorage.setItem("tasks", JSON.stringify(tasksArray));
	}
};

const toggleTaskCompletion = event => {
	if (event.target.tagName === "INPUT") {
		const { index } = getTaskInfo(event);
		tasksArray[index].isDone = !tasksArray[index].isDone;
		localStorage.setItem("tasks", JSON.stringify(tasksArray));
	}
};

const clearCompletedTask = () => {
	tasksArray = tasksArray.filter(task => {
		if (task.isDone === false) {
			return task;
		}
	});
	tasksList.innerText = "";
	renderTasks();
	localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

input.addEventListener("keypress", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", toggleTaskCompletion);
clearTasks.addEventListener("click", clearCompletedTask);
