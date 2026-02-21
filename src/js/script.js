// Takeoff & Redirect
document.addEventListener('DOMContentLoaded', function () {
    const Vostock = document.querySelector('.rocket');

    Vostock.addEventListener('click', function () {
        this.classList.add('flyUp');
        //redirect to the new URL
        setTimeout(function() {
            window.location.href = "launch.html";
        }, 950);
    });

});

// ############################################################################## //
// ############################################################################## //
// ############################################################################## //

// Navigation bar
const content = document.getElementById('page-wrap');
const sidenav = document.getElementById("main-nav");
const toggleBtn = document.getElementById("menu-toggle");

toggleBtn.addEventListener("click", () => {
  sidenav.classList.toggle("open");
  content.classList.toggle('shifted');
  if (sidenav.classList.contains("open")) {
    toggleBtn.innerHTML = "&times;";
  } else {
    toggleBtn.innerHTML = "&#9776;";
  }
});