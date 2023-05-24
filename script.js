const tab = (specifyTab) => {
	$(".section-container").hide();
	let cityElement = $("#" + specifyTab);
	if (cityElement.length > 0) {
		cityElement.css({ display: "flex", opacity: "0" });
		setTimeout(() => {
			cityElement.css({ transition: "opacity 0.5s ease-in-out", opacity: "1" });
		}, 0);
	}
};
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
function updateClock() {
	const now = new Date();
	let hours = now.getHours();
	const minutes = ("0" + now.getMinutes()).slice(-2);
	const seconds = ("0" + now.getSeconds()).slice(-2);
	const milliseconds = ("00" + now.getMilliseconds()).slice(-3);
	const meridiem = hours >= 12 ? "PM" : "AM";
	hours = (hours % 12 || 12).toString().padStart(2, "0");
	const timeString = hours + ":" + minutes + ":" + seconds + "." + milliseconds + " " + meridiem;
	const clockElement = $(".clock");
	clockElement.text(timeString);
	requestAnimationFrame(updateClock);
}
requestAnimationFrame(updateClock);
let frames = 0;
let startTime = performance.now();
function updateFPSCounter() {
	frames++;
	const currentTime = performance.now();
	const elapsedSeconds = (currentTime - startTime) / 1000;
	if (elapsedSeconds >= 1) {
		const fps = Math.round(frames / elapsedSeconds);
		$("#fps-value").text(fps);
		frames = 0;
		startTime = currentTime;
	}
	requestAnimationFrame(updateFPSCounter);
}
updateFPSCounter();
function measurePing() {
	let startTime = new Date().getTime();
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			let endTime = new Date().getTime();
			let pingTime = endTime - startTime;
			document.getElementById("ping-counter").textContent = "Ping: " + pingTime + " ms";
		}
	};
	xhr.open("GET", "https://svitserk-morningstar.github.io", true);
	xhr.send();
}
setInterval(measurePing, 1000);
if (localStorage.visitcount) {
	document.getElementById("count").innerHTML = localStorage.visitcount;
	localStorage.visitcount = Number(localStorage.visitcount) + 1;
}
