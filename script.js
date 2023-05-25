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

let selectElement = document.getElementById("Urban-Dubov-sploop-scripts");
let urbanContainer = document.getElementById("urbans-container");
let om07Container = document.getElementById("Om07s-container");

selectElement.addEventListener("change", function () {
	switch (selectElement.value) {
		case "choose-sploop-Om07":
			urbanContainer.style.display = "none";
			om07Container.style.display = "grid";
			break;
		case "choose-sploop-Urban-Dubov":
			urbanContainer.style.display = "grid";
			om07Container.style.display = "none";
			break;
	}
});
