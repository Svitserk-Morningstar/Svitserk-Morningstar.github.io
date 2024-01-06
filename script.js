function changeTab(evt, cityName) {
  $(".section📁").hide();
  $(".button📁").removeClass("active📁");
  $("#" + cityName).css("display", "flex");
  $(evt.currentTarget).addClass("active📁");
}
