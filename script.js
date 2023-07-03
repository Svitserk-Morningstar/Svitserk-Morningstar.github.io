let contentLoaded = false;

class Functions {
	constructor() {
		this.fps = 0;
		this.frames = 0;
		this.count = 0;
		this.selectElement = document.querySelector("#Mr-Elusive-sploop-scripts");
		this.urbanContainer = document.querySelector("#urbans-container");
		this.om07Container = document.querySelector("#Om07s-container");
		this.dercoContainer = document.querySelector("#Derco-container");

		this.startPinging = this.startPinging.bind(this);
		this.updateFPS = this.updateFPS.bind(this);
		this.countFrames = this.countFrames.bind(this);
		this.loop = this.loop.bind(this);
		this.changeTab = this.changeTab.bind(this);
		this.createNotification = this.createNotification.bind(this);

		this.setup();
	}

	setup() {
		this.setupPing();
		this.setupTabs();
		this.setupCountdown();
		this.setupButtonCounter();
		this.setupLocalStorage();
		this.setupParticles();
		this.setupCounter();
		this.setupSection();
	}

	setupSection() {
		let title = document.getElementsByClassName("section-title");
		let section = document.getElementsByClassName("section-content");
		let clickEnabled = new Array(title.length).fill(true);

		for (let i = 0; i < title.length; i++) {
			title[i].addEventListener("click", function () {
				if (!clickEnabled[i]) {
					return;
				}

				clickEnabled[i] = false;
				this.classList.toggle("active");
				let icon = this.getElementsByClassName("icon")[0];
				if (icon) {
					icon.classList.toggle("rotate");
				}
				let content = this.nextElementSibling;
				if (content.classList.contains("open")) {
					content.style.maxHeight = "0";
					content.classList.remove("open");
					section[i].classList.remove("tooltip-overflow");
					setTimeout(() => {
						clickEnabled[i] = true;
					}, 300);
				} else {
					content.style.maxHeight = content.scrollHeight + "px";
					content.classList.add("open");
					setTimeout(() => {
						section[i].classList.add("tooltip-overflow");
						clickEnabled[i] = true;
					}, 300);
				}
			});
		}
	}

	setupParticles() {
		particlesJS("particles-js", {
			particles: {
				number: { value: 80, density: { enable: true, value_area: 800 } },
				color: { value: "#897961" },
				shape: { type: "circle", stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 5 } },
				opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
				size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
				line_linked: { enable: true, distance: 150, color: "#a27e49", opacity: 0.4, width: 1 },
				move: {
					enable: true,
					speed: 0.5,
					direction: "none",
					random: false,
					straight: false,
					out_mode: "out",
					bounce: false,
					attract: { enable: false, rotateX: 600, rotateY: 1200 },
				},
			},
			interactivity: {
				detect_on: "canvas",
				events: { onhover: { enable: false, mode: "repulse" }, onclick: { enable: false, mode: "push" }, resize: true },
				modes: {
					grab: { distance: 400, line_linked: { opacity: 1 } },
					bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
					repulse: { distance: 200, duration: 0.4 },
					push: { particles_nb: 4 },
					remove: { particles_nb: 2 },
				},
			},
			retina_detect: true,
		});
	}

	setupToggleItems() {
		const toggleItems = [
			{
				toggle: document.querySelector("#upcoming-scripts"),
				elements: document.querySelectorAll(".disabled"),
				stateKey: "toggleStateUpcomingScripts",
				show: function () {
					this.elements.forEach(function (element) {
						element.style.display = "grid";
					});
				},
				hide: function () {
					this.elements.forEach(function (element) {
						element.style.display = "none";
					});
				},
			},
			{
				toggle: document.querySelector("#particles"),
				elements: document.querySelectorAll("#particles-js"),
				stateKey: "toggleStateParticleJS",
				show: function () {
					this.elements.forEach(function (element) {
						element.style.display = "block";
					});
				},
				hide: function () {
					this.elements.forEach(function (element) {
						element.style.display = "none";
					});
				},
			},
		];

		toggleItems.forEach(function (item) {
			const savedState = localStorage.getItem(item.stateKey);

			if (savedState !== "unchecked") {
				item.toggle.checked = true;
				item.show();
			} else {
				item.toggle.checked = false;
				item.hide();
			}

			item.toggle.addEventListener("change", function () {
				if (this.checked) {
					item.show();
					localStorage.setItem(item.stateKey, "checked");
				} else {
					item.hide();
					localStorage.setItem(item.stateKey, "unchecked");
				}
			});
		});
	}

	setupLocalStorage() {
		!(function (t) {
			t.fn.savy = function (e, i) {
				const s = "savy-";
				"load" == e
					? (t(this).each(function () {
							t(this).is(":radio")
								? (localStorage.getItem(s + t(this).attr("name")) && (localStorage.getItem(s + t(this).attr("name")) == this.id ? (this.checked = !0) : (this.checked = !1)),
								  t(this).change(function () {
										localStorage.setItem(s + t(this).attr("name"), this.id);
								  }))
								: t(this).is(":checkbox")
								? (localStorage.getItem(s + this.id) && (this.checked = "1" == localStorage.getItem(s + this.id)),
								  t(this).change(function () {
										localStorage.setItem(s + this.id, this.checked ? "1" : "0");
								  }))
								: t(this).is("input") || t(this).is("textarea")
								? (localStorage.getItem(s + this.id) && (this.value = localStorage.getItem(s + this.id)),
								  t(this).on("focus", function () {
										var e = setInterval(() => {
											localStorage.setItem(s + this.id, this.value), t(this).is(":focus") || clearInterval(e);
										}, 500);
								  }))
								: t(this).is("select") &&
								  (t(this).is("[multiple]")
										? (localStorage.getItem(s + this.id) ? t(this).val(localStorage.getItem(s + this.id).split(",")) : localStorage.setItem(s + this.id, t(this).val()),
										  t(this).change(function () {
												localStorage.setItem(s + this.id, t(this).val());
										  }))
										: (localStorage.getItem(s + this.id) ? t(this).val(localStorage.getItem("savy-" + this.id)) : localStorage.setItem(s + this.id, t(this).val()),
										  t(this).change(function () {
												localStorage.setItem(s + this.id, t(this).val());
										  })));
					  }),
					  t.isFunction(i) && i())
					: "destroy" == e
					? (t(this).each(function () {
							localStorage.getItem(s + this.id) && localStorage.removeItem(s + this.id);
					  }),
					  t.isFunction(i) && i())
					: console.error("savy action not defined please use $('.classname').savy('load') to trigger savy to save all inputs");
			};
		})(jQuery);

		$(".auto-save").savy("load");
	}

	setupButtonCounter() {
		const buttons = document.getElementsByClassName("counting-buttons");
		const total = buttons.length;
		document.querySelector("#count-buttons-display").innerHTML = total;
	}

	setupPing() {
		setInterval(this.updateFPS.bind(this), 1000);
		requestAnimationFrame(() => {
			this.countFrames();
			requestAnimationFrame(this.loop.bind(this));
		});
	}

	setupCounter() {
		if (localStorage.getItem("count")) {
			this.count = parseInt(localStorage.getItem("count"));
		} else {
			this.count = 0;
			localStorage.setItem("count", this.count);
		}
		document.querySelector("#counter").innerHTML = this.count;
	}

	setupTabs() {
		const hideStyle = "none";
		const gridStyle = "grid";
		const transitionDuration = 100;

		window.addEventListener("DOMContentLoaded", () => {
			const activeSection = localStorage.getItem("activeSection");
			const activeButtonIndex = localStorage.getItem("activeButton");
			if (activeSection && activeButtonIndex !== null) {
				const navButtons = document.getElementsByClassName("nav-buttons");
				const activeButton = navButtons[activeButtonIndex];
				if (activeButton) {
					activeButton.click();
				}
			}
		});

		if (localStorage.getItem("selectedValue")) {
			this.selectElement.value = localStorage.getItem("selectedValue");
		}

		this.selectElement.addEventListener("change", () => {
			const value = this.selectElement.value;
			if (document.querySelector("#site-sounds").checked && contentLoaded) {
				this.playSound("https://cdn.discordapp.com/attachments/945291891207966740/1115228716814041168/soundscrate-anime-sword-swipe-down-02.mp3", 0.2);
			}

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

				this.urbanContainer.style.display = value === "choose-sploop-Mr-Elusive" ? gridStyle : hideStyle;
				this.om07Container.style.display = value === "choose-sploop-Om07" ? gridStyle : hideStyle;
				this.dercoContainer.style.display = value === "choose-sploop-Derco" ? gridStyle : hideStyle;

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
			this.urbanContainer.style.display = storedValue === "choose-sploop-Mr-Elusive" ? gridStyle : hideStyle;
			this.om07Container.style.display = storedValue === "choose-sploop-Om07" ? gridStyle : hideStyle;
			this.dercoContainer.style.display = storedValue === "choose-sploop-Derco" ? gridStyle : hideStyle;
		}
	}

	setupCountdown() {
		const endUTC = Date.UTC(2023, 6, 6, 20);
		const _second = 1000;
		const _minute = _second * 60;
		const _hour = _minute * 60;
		const _day = _hour * 24;

		const countdownElement = document.querySelector("#countdown");

		function showRemaining() {
			const now = Date.now();
			const distance = endUTC - now;

			if (distance < 0) {
				clearInterval(timer);
				countdownElement.innerHTML = `
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

			const countdownString = `${days} days, ${hours} hrs, ${minutes} mins, ${seconds} secs`;
			countdownElement.innerHTML = countdownString;
		}

		const timer = setInterval(showRemaining, 1000);
	}

	ping(url) {
		let startTime = new Date().getTime();
		let xhr = new XMLHttpRequest();
		let pingCounter = document.querySelector("#pingCounter");

		xhr.onreadystatechange = function () {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				let endTime = new Date().getTime();
				let pingTime = endTime - startTime;
				pingCounter.innerHTML = pingTime;

				if (pingTime > 20) {
					pingCounter.style.color = "red";
				} else if (pingTime > 10) {
					pingCounter.style.color = "orange";
				} else {
					pingCounter.style.color = "";
				}
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
		let fpsCounter = document.querySelector("#fps-counter");
		this.fps = this.frames;
		this.frames = 0;

		if (this.fps < 10) {
			fpsCounter.style.color = "red";
		} else if (this.fps < 30) {
			fpsCounter.style.color = "orange";
		} else {
			fpsCounter.style.color = "";
		}

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
		const sectionContainers = document.getElementsByClassName("section-container");
		Array.from(sectionContainers).forEach((container) => {
			container.style.opacity = 0;
			container.style.display = "none";
		});

		const navButtons = document.getElementsByClassName("nav-buttons");
		Array.from(navButtons).forEach((button) => {
			button.classList.remove("active");
			button.classList.add("inactive");
		});

		if (document.querySelector("#site-sounds").checked && contentLoaded) {
			this.playSound("https://cdn.discordapp.com/attachments/945291891207966740/1115228716814041168/soundscrate-anime-sword-swipe-down-02.mp3", 0.2);
		}

		const activeSection = document.getElementById(name);
		activeSection.style.display = "flex";

		setTimeout(() => {
			activeSection.style.opacity = 1;
		}, 10);

		evt.currentTarget.classList.remove("inactive");
		evt.currentTarget.classList.add("active");

		localStorage.setItem("activeSection", name);

		Array.from(navButtons).forEach((button, index) => {
			if (button === evt.currentTarget) {
				localStorage.setItem("activeButton", index);
			}
		});
	}

	createNotification(text) {
		const container = $("#notificationContainer");
		const notification = $("<div>")
			.addClass("notification fade-out")
			.text("Copied " + text);

		container.prepend(notification);

		if ($("#site-sounds").is(":checked")) {
			this.playSound("https://cdn.discordapp.com/attachments/945291891207966740/1115228717267046472/soundscrate-graphics-soft-pluck-confirmation.mp3", 0.2);
		}

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

		const el = $("<textarea></textarea>");
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

document.addEventListener("DOMContentLoaded", () => {
	run.setupCountdown();
	run.startPinging("https://svitserk-morningstar.github.io");
	run.setupToggleItems();
});
