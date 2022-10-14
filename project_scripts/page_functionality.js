function changing(x) {
  x.classList.toggle("change");
  document.getElementById("dropitem").classList.toggle("show");
}
window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 750);
});

function redirect() {
  let url = "../project_pages/Homepage.html";
  window.location(url);
}
window.history.forward();
function noBack() {
  window.history.forward();
}
window.history.forward();
function noForward() {
  window.history.back();
}