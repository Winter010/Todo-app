const input = document.getElementById("task-input");

const tasksList = document.querySelector(".todo-list");

const itemsLeft = document.querySelector(".items-left");

const displayItemsLeft = () => {
	const allTasks = document.querySelectorAll(".todo-list__item");
	itemsLeft.innerHTML = `${allTasks.length} items left`;
};

displayItemsLeft();

const addTask = event => {
	const taskTemplate = `
<li class="todo-list__item">
	<label>
		<input type="checkbox" name="complete-task" />
		<div class="todo-list__checkmark"></div>
		<span>${input.value}</span>
	</label>
	<div class="todo-list__remove-item" data-action="delete"></div>
</li>
	`;

	if (event.key === "Enter") {
		if (input.value.trim() !== "") {
			tasksList.insertAdjacentHTML("beforeend", taskTemplate);
			input.value = "";
		}
	}

	displayItemsLeft();
};

const deleteTask = event => {
	if (event.target.dataset.action === "delete") {
		const parentNode = event.target.closest("li");
		parentNode.remove();
	}
	displayItemsLeft();
};

input.addEventListener("keypress", addTask);

tasksList.addEventListener("click", deleteTask);
