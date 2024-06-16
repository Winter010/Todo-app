const body = document.getElementById("body");
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
	if (themeToggle.checked) {
		body.classList.add("theme-white");
	} else {
		body.classList.remove("theme-white");
	}
	
})