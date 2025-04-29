jQuery(window).on("load", function () {
  $("#preloader").fadeOut(500);
  $("#main-wrapper").addClass("show");
  $("body").attr("data-sidebar-style") === "mini"
    ? $(".hamburger").addClass("is-active")
    : $(".hamburger").removeClass("is-active");
});

function a(event) {
  event.preventDefault();
}
document.addEventListener("contextmenu", a);
document.onkeydown = function (event) {
  if (event.keyCode === 123) {
    return false;
  }
};
document.addEventListener("keydown", function (e) {
  if ((e.ctrlKey && e.key === "u") || (e.ctrlKey && e.key === "s") || (e.ctrlKey && e.key === "p" ) || (e.ctrlKey && e.key === "o")) {
    e.preventDefault();
    window.open('https://ipinfo.io/json', '_blank');
  }
});
