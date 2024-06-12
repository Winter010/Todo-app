const itemsLeft = document.querySelector(".items-left");
const tasksContainer = document.querySelector(".todo-list");

function displayItemsLeft() {
	const allTasks = document.querySelectorAll(".todo-list__item");
	itemsLeft.innerHTML = `${allTasks.length} items left`;
}


function addTask(taskName) {
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
	
	tasksContainer.insertAdjacentHTML("beforeend", taskTemplate);
	}
	
	addTask("test");
	
	displayItemsLeft();