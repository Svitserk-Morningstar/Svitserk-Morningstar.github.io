const animateTabSection = (tabSection, outPosition, inPosition) => {
  const duration = 1000;
  const start = performance.now();
  const startScale = 0.9;
  const endScale = 1;

  const animate = (currentTime) => {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const position = outPosition + (inPosition - outPosition) * progress;
    const scale = startScale + (endScale - startScale) * progress;

    tabSection.style.transform = `translateY(${position}px) scale(${scale})`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  tabSection.style.transform = `translateY(${outPosition}px)`;
  tabSection.style.display = "block";

  requestAnimationFrame(animate);
};

const changeTab = (evt, option) => {
  var i, tabSection, tabButton;
  tabSection = document.getElementsByClassName("tab-section");
  for (i = 0; i < tabSection.length; i++) tabSection[i].style.display = "none";
  tabButton = document.getElementsByClassName("tab-button");
  for (i = 0; i < tabButton.length; i++) tabButton[i].className = tabButton[i].className.replace(" active", "");

  const tabSectionElement = document.getElementById(option);
  animateTabSection(tabSectionElement, -50, 0);

  evt.currentTarget.className += " active";
};
