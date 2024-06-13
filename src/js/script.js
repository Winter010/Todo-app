const input = document.getElementById("task-input");

const tasksContainer = document.querySelector(".todo-list");

const itemsLeft = document.querySelector(".items-left");

const displayItemsLeft = () => {
	const allTasks = document.querySelectorAll(".todo-list__item");
	itemsLeft.innerHTML = `${allTasks.length} items left`;
};

const addTask = taskName => {
	const taskTemplate = `
	<li class="todo-list__item">
	<label>
	<input type="checkbox" />
	<div class="todo-list__checkmark"></div>
	<span>${taskName}</span>
	</label>
	<div class="todo-list__remove-item"></div>
	</li>
	`;

	if (input.value.trim() !== "") {
		tasksContainer.insertAdjacentHTML("beforeend", taskTemplate);

		input.value = "";
	}
	displayItemsLeft();
};

displayItemsLeft();

input.addEventListener("keypress", event => {
	event.key === "Enter" ? addTask(input.value) : null;
});
