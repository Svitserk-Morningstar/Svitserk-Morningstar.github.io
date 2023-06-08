class Functions {
	constructor() {
		this.fps = 0;
		this.frames = 0;
		this.count = 0;
		this.selectElement = document.querySelector("#Urban-Dubov-sploop-scripts");
		this.urbanContainer = document.querySelector("#urbans-container");
		this.om07Container = document.querySelector("#Om07s-container");
		this.dercoContainer = document.querySelector("#Derco-container");

		this.startPinging = this.startPinging.bind(this);
		this.updateFPS = this.updateFPS.bind(this);
		this.countFrames = this.countFrames.bind(this);
		this.loop = this.loop.bind(this);
		this.incrementCounter = this.incrementCounter.bind(this);
		this.playSound = this.playSound.bind(this);
		this.changeTab = this.changeTab.bind(this);
		this.createNotification = this.createNotification.bind(this);

		this.setupPing();
		this.setupCounter();
		this.setupTabs();
		this.setupCountdown();
		this.setupButtonCounter();
	}

	setupButtonCounter() {
		const buttons = document.getElementsByClassName("counting-buttons");
		const total = buttons.length;
		document.querySelector("#count-buttons-display").innerHTML = total;
	}

	setupPing() {
		setInterval(this.updateFPS, 1000);
		requestAnimationFrame(() => {
			this.countFrames();
			requestAnimationFrame(this.loop);
		});
	}

	setupCounter() {
		if (localStorage.getItem("count")) {
			this.count = parseInt(localStorage.getItem("count"));
		} else {
			this.count = 1;
			localStorage.setItem("count", this.count);
		}
		document.querySelector("#counter").innerHTML = this.count;
	}

	setupTabs() {
		window.addEventListener("DOMContentLoaded", () => {
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

		const hideStyle = "none";
		const gridStyle = "grid";

		if (localStorage.getItem("selectedValue")) {
			this.selectElement.value = localStorage.getItem("selectedValue");
		}

		this.selectElement.addEventListener("change", () => {
			const value = this.selectElement.value;
			this.playSound("https://cdn.discordapp.com/attachments/945291891207966740/1115228716814041168/soundscrate-anime-sword-swipe-down-02.mp3", 0.2);

			const hideStyle = "none";
			const gridStyle = "grid";
			const transitionDuration = 100;

			this.urbanContainer.style.opacity = 0;
			this.om07Container.style.opacity = 0;
			this.dercoContainer.style.opacity = 0;

			this.urbanContainer.style.transition = `opacity ${transitionDuration}ms ease-in-out`;
			this.om07Container.style.transition = `opacity ${transitionDuration}ms ease-in-out`;
			this.dercoContainer.style.transition = `opacity ${transitionDuration}ms ease-in-out`;

			const transitionEndHandler = () => {
				this.urbanContainer.removeEventListener("transitionend", transitionEndHandler);
				this.om07Container.removeEventListener("transitionend", transitionEndHandler);
				this.dercoContainer.removeEventListener("transitionend", transitionEndHandler);

				switch (value) {
					case "choose-sploop-Om07":
						this.urbanContainer.style.display = hideStyle;
						this.om07Container.style.display = gridStyle;
						this.dercoContainer.style.display = hideStyle;
						break;
					case "choose-sploop-Urban-Dubov":
						this.urbanContainer.style.display = gridStyle;
						this.om07Container.style.display = hideStyle;
						this.dercoContainer.style.display = hideStyle;
						break;
					case "choose-sploop-Derco":
						this.urbanContainer.style.display = hideStyle;
						this.om07Container.style.display = hideStyle;
						this.dercoContainer.style.display = gridStyle;
						break;
				}

				setTimeout(() => {
					this.urbanContainer.style.opacity = 1;
					this.om07Container.style.opacity = 1;
					this.dercoContainer.style.opacity = 1;
				}, 0);
			};

			this.urbanContainer.addEventListener("transitionend", transitionEndHandler);
			this.om07Container.addEventListener("transitionend", transitionEndHandler);
			this.dercoContainer.addEventListener("transitionend", transitionEndHandler);

			localStorage.setItem("selectedValue", value);
		});

		if (localStorage.getItem("selectedValue")) {
			const storedValue = localStorage.getItem("selectedValue");
			switch (storedValue) {
				case "choose-sploop-Om07":
					this.urbanContainer.style.display = hideStyle;
					this.om07Container.style.display = gridStyle;
					this.dercoContainer.style.display = hideStyle;
					break;
				case "choose-sploop-Urban-Dubov":
					this.urbanContainer.style.display = gridStyle;
					this.om07Container.style.display = hideStyle;
					this.dercoContainer.style.display = hideStyle;
					break;
				case "choose-sploop-Derco":
					this.urbanContainer.style.display = hideStyle;
					this.om07Container.style.display = hideStyle;
					this.dercoContainer.style.display = gridStyle;
					break;
			}
		}
	}

	setupCountdown() {
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
				document.querySelector("#countdown").innerHTML = `
		  released, check out
		  <span class="random-buttons" onclick="run.changeTab(event, 'files')">
		  <i class="ri-download-cloud-2-line"></i>
		  </span>
		  `;
				return;
			}

			const days = Math.floor(distance / _day);
			const hours = Math.floor((distance % _day) / _hour);
			const minutes = Math.floor((distance % _hour) / _minute);
			const seconds = Math.floor((distance % _minute) / _second);

			const countdownString = days + " days, " + hours + " hrs, " + minutes + " mins, " + seconds + " secs";
			document.querySelector("#countdown").innerHTML = countdownString;
		}

		timer = setInterval(showRemaining, 1000);
	}

	ping(url) {
		let startTime = new Date().getTime();
		let xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				let endTime = new Date().getTime();
				let pingTime = endTime - startTime;
				document.querySelector("#pingCounter").innerHTML = pingTime;
			}
		};

		xhr.open("GET", url, true);
		xhr.send();
	}

	startPinging(url) {
		setInterval(() => {
			this.ping(url);
		}, 1000);
	}

	updateFPS() {
		this.fps = this.frames;
		this.frames = 0;
		document.querySelector("#fps-counter").innerText = this.fps;
	}

	countFrames() {
		this.frames++;
	}

	incrementCounter() {
		this.count++;
		localStorage.setItem("count", this.count);
		document.querySelector("#counter").innerHTML = this.count;
	}

	playSound(audio, volume) {
		const sound = new Audio(audio);
		sound.volume = volume;
		sound.play();
	}

	changeTab(evt, name) {
		let i, sectionContainer, navButtons;
		sectionContainer = document.getElementsByClassName("section-container");
		for (i = 0; i < sectionContainer.length; i++) {
			sectionContainer[i].style.opacity = 0;
			sectionContainer[i].style.display = "none";
		}
		navButtons = document.getElementsByClassName("nav-buttons");
		for (i = 0; i < navButtons.length; i++) {
			navButtons[i].classList.remove("active");
			navButtons[i].classList.add("inactive");
		}
		this.playSound("https://cdn.discordapp.com/attachments/945291891207966740/1115228716814041168/soundscrate-anime-sword-swipe-down-02.mp3", 0.2);

		let activeSection = document.getElementById(name);
		activeSection.style.display = "flex";

		setTimeout(() => {
			activeSection.style.opacity = 1;
		}, 10);

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

	createNotification(text) {
		const container = $("#notificationContainer");
		const notification = $("<div>")
			.addClass("notification fade-out")
			.text("Copied " + text);
		container.prepend(notification);
		this.playSound("https://cdn.discordapp.com/attachments/945291891207966740/1115228717267046472/soundscrate-graphics-soft-pluck-confirmation.mp3", 0.2);
		notification[0].offsetHeight;
		notification.removeClass("fade-out");
		notification.addClass("fade-in");

		setTimeout(() => {
			notification.removeClass("fade-in");
			notification.addClass("fade-out");
		}, 2000);
		setTimeout(() => {
			notification.remove();
		}, 2300);

		let el = $("<textarea></textarea>");
		el.val(text);
		$("body").append(el);
		el.select();
		document.execCommand("copy");
		el.remove();
	}

	loop() {
		this.countFrames();
		requestAnimationFrame(this.loop.bind(this));
	}
}

const run = new Functions();
run.setupCountdown();
run.startPinging("https://svitserk-morningstar.github.io");
