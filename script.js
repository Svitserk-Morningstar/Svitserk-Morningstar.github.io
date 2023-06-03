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
	const changeSound = new Audio("https://cdn.discordapp.com/attachments/1094697576391004272/1114343994151940106/soundscrate-anime-sword-swipe-down-02.mp3");
	sectionContainer = document.getElementsByClassName("section-container");
	for (i = 0; i < sectionContainer.length; i++) {
		sectionContainer[i].style.display = "none";
	}
	navButtons = document.getElementsByClassName("nav-buttons");
	for (i = 0; i < navButtons.length; i++) {
		navButtons[i].classList.remove("active");
		navButtons[i].classList.add("inactive");
	}
	changeSound.volume = 0.6;
	changeSound.play();
	document.getElementById(name).style.display = "flex";
	evt.currentTarget.classList.remove("inactive");
	evt.currentTarget.classList.add("active");

	localStorage.setItem("activeSection", name);
	for (i = 0; i < navButtons.length; i++) {
		if (navButtons[i] === evt.currentTarget) {
			localStorage.setItem("activeButton", i);
			break;
		}
	}
}

window.addEventListener("DOMContentLoaded", function () {
	const activeSection = localStorage.getItem("activeSection");
	const activeButtonIndex = localStorage.getItem("activeButton");
	if (activeSection && activeButtonIndex !== null) {
		const navButtons = document.getElementsByClassName("nav-buttons");
		const activeButton = navButtons[activeButtonIndex];
		if (activeButton) {
			const event = new Event("click");
			activeButton.dispatchEvent(event);
		}
	}
});

function createNotification(text) {
	const container = $("#notificationContainer");
	const notificationSound = new Audio("https://cdn.discordapp.com/attachments/1094697576391004272/1114342145655066665/soundscrate-graphics-soft-pluck-confirmation.mp3");
	const notification = $("<div>")
		.addClass("notification fade-out")
		.text("Copied " + text);
	container.prepend(notification);
	notificationSound.play();
	notification[0].offsetHeight;
	notification.removeClass("fade-out");
	notification.addClass("fade-in");

	setTimeout(function () {
		notification.removeClass("fade-in");
		notification.addClass("fade-out");
	}, 2000);
	setTimeout(function () {
		notification.remove();
	}, 2300);

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
const dercoContainer = document.getElementById("Derco-container");
const hideStyle = "none";
const gridStyle = "grid";

if (localStorage.getItem("selectedValue")) selectElement.value = localStorage.getItem("selectedValue");

selectElement.addEventListener("change", function () {
	const value = selectElement.value;
	const changeSound = new Audio("https://cdn.discordapp.com/attachments/1094697576391004272/1114343994151940106/soundscrate-anime-sword-swipe-down-02.mp3");
	changeSound.volume = 0.6;
	changeSound.play();

	switch (value) {
		case "choose-sploop-Om07":
			urbanContainer.style.display = hideStyle;
			om07Container.style.display = gridStyle;
			dercoContainer.style.display = hideStyle;
			break;
		case "choose-sploop-Urban-Dubov":
			urbanContainer.style.display = gridStyle;
			om07Container.style.display = hideStyle;
			dercoContainer.style.display = hideStyle;
			break;
		case "choose-sploop-Derco":
			urbanContainer.style.display = hideStyle;
			om07Container.style.display = hideStyle;
			dercoContainer.style.display = gridStyle;
			break;
	}

	localStorage.setItem("selectedValue", value);
});

if (localStorage.getItem("selectedValue")) {
	const storedValue = localStorage.getItem("selectedValue");
	switch (storedValue) {
		case "choose-sploop-Om07":
			urbanContainer.style.display = hideStyle;
			om07Container.style.display = gridStyle;
			dercoContainer.style.display = hideStyle;
			break;
		case "choose-sploop-Urban-Dubov":
			urbanContainer.style.display = gridStyle;
			om07Container.style.display = hideStyle;
			dercoContainer.style.display = hideStyle;
			break;
		case "choose-sploop-Derco":
			urbanContainer.style.display = hideStyle;
			om07Container.style.display = hideStyle;
			dercoContainer.style.display = gridStyle;
			break;
	}
}

const endUTC = Date.UTC(2023, 5, 8, 19);
const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;
let timer;

function showRemaining() {
	const now = new Date();
	const nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

	const distance = endUTC - nowUTC;

	if (distance < 0) {
		clearInterval(timer);
		document.getElementById("countdown").innerHTML = `
		released, check out
		<span class="random-buttons" onclick="changeTab(event, 'codes')">
			<i class="ri-code-box-fill"></i>
		</span>
		`;
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
