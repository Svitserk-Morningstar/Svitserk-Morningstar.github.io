const changeTab = (evt, option) => {
  var i, tabSection, tabButton;
  tabSection = document.getElementsByClassName("tab-section");
  for (i = 0; i < tabSection.length; i++) tabSection[i].style.display = "none";
  tabButton = document.getElementsByClassName("tab-button");
  for (i = 0; i < tabButton.length; i++) tabButton[i].className = tabButton[i].className.replace(" active", "");
  document.getElementById(option).style.display = "block";
  evt.currentTarget.className += " active";
};
