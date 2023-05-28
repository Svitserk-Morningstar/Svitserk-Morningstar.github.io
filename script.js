function ping(url) {
	let startTime = new Date().getTime();
	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			let endTime = new Date().getTime();
			let pingTime = endTime - startTime;
			document.getElementById("pingCounter").innerHTML = pingTime;
		}
	};

	xhr.open("GET", url, true);
	xhr.send();
}

function startPinging(url) {
	setInterval(function () {
		ping(url);
	}, 1000);
}

startPinging("https://svitserk-morningstar.github.io");

let fps = 0;
let frames = 0;

function updateFPS() {
	fps = frames;
	frames = 0;
	document.getElementById("fps-counter").innerText = fps;
}

function countFrames() {
	frames++;
}

setInterval(updateFPS, 1000);
requestAnimationFrame(function loop() {
	countFrames();
	requestAnimationFrame(loop);
});

function incrementCounter() {
	if (localStorage.getItem("count")) {
		let count = parseInt(localStorage.getItem("count"));
		count++;
		localStorage.setItem("count", count);
	} else {
		localStorage.setItem("count", 1);
	}
	document.getElementById("counter").innerHTML = localStorage.getItem("count");
}

function changeTab(evt, name) {
	let i, sectionContainer, navButtons;
	sectionContainer = document.getElementsByClassName("section-container");
	for (i = 0; i < sectionContainer.length; i++) {
		sectionContainer[i].style.display = "none";
	}
	navButtons = document.getElementsByClassName("nav-buttons");
	for (i = 0; i < navButtons.length; i++) {
		navButtons[i].classList.remove("active");
		navButtons[i].classList.add("inactive");
	}
	document.getElementById(name).style.display = "flex";
	evt.currentTarget.classList.remove("inactive");
	evt.currentTarget.classList.add("active");
}

function createNotification(text) {
	const container = $("#notificationContainer");
	const notification = $("<div>")
		.addClass("notification")
		.text("Copied " + text);
	container.prepend(notification);
	setTimeout(function () {
		notification.addClass("fade-out");
	}, 2500);
	setTimeout(function () {
		notification.remove();
	}, 3000);
	let el = $("<textarea></textarea>");
	el.val(text);
	$("body").append(el);
	el.select();
	document.execCommand("copy");
	el.remove();
}

const selectElement = document.getElementById("Urban-Dubov-sploop-scripts");
const urbanContainer = document.getElementById("urbans-container");
const om07Container = document.getElementById("Om07s-container");
const hideStyle = "none";
const gridStyle = "grid";

selectElement.addEventListener("change", function () {
	const value = selectElement.value;

	switch (value) {
		case "choose-sploop-Om07":
			urbanContainer.style.display = hideStyle;
			om07Container.style.display = gridStyle;
			break;
		case "choose-sploop-Urban-Dubov":
			urbanContainer.style.display = gridStyle;
			om07Container.style.display = hideStyle;
			break;
	}
});

const end = new Date("05/30/2023 7:00 PM");
const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;
let timer;

function showRemaining() {
	const now = new Date();
	const distance = end - now;

	if (distance < 0) {
		clearInterval(timer);
		document.getElementById("countdown").innerHTML = "Script released.";
		return;
	}

	const days = Math.floor(distance / _day);
	const hours = Math.floor((distance % _day) / _hour);
	const minutes = Math.floor((distance % _hour) / _minute);
	const seconds = Math.floor((distance % _minute) / _second);

	const countdownString = days + " days, " + hours + " hrs, " + minutes + " mins, " + seconds + " secs";
	document.getElementById("countdown").innerHTML = countdownString;
}

timer = setInterval(showRemaining, 1000);
