function changeTab(evt, cityName) {
  var i, section, button;
  section = document.getElementsByClassName("section📁");
  for (i = 0; i < section.length; i++) {
    section[i].style.display = "none";
  }
  button = document.getElementsByClassName("button📁");
  for (i = 0; i < button.length; i++) {
    button[i].className = button[i].className.replace(" active📁", "");
  }
  document.getElementById(cityName).style.display = "flex";
  evt.currentTarget.className += " active📁";
}
