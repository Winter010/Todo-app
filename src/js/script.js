const input = document.getElementById("task-input");
const tasksList = document.querySelector(".todo-list");
const itemsLeft = document.querySelector(".items-left");

const displayItemsLeft = () => {
	const allTasks = document.querySelectorAll(".todo-list__item");
	itemsLeft.innerText = `${allTasks.length} items left`;
};

displayItemsLeft();

const tasksArray = [];

const addTask = event => {
	const taskText = input.value;

	if (event.key === "Enter" && taskText.trim() !== "") {
		const newTask = {
			id: Date.now(),
			text: taskText,
			isDone: false,
		};
		const taskTemplate = `
			<li class="todo-list__item" id="${newTask.id}">
				<label>
					<input type="checkbox" name="complete-task" />
					<div class="todo-list__checkmark"></div>
					<span>${newTask.text}</span>
				</label>
				<div class="todo-list__remove-item" data-action="delete"></div>
			</li>
		`;

		tasksArray.push(newTask);
		tasksList.insertAdjacentHTML("beforeend", taskTemplate);
		input.value = "";

		displayItemsLeft();
	}
};

const deleteTask = event => {
	if (event.target.dataset.action === "delete") {
		const parentNode = event.target.closest("li");
		const index = tasksArray.findIndex(task => task.id == parentNode.id);
		tasksArray.splice(index, 1);

		parentNode.remove();
		displayItemsLeft();
	}
};

input.addEventListener("keypress", addTask);
tasksList.addEventListener("click", deleteTask);
