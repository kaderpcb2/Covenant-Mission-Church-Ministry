document.documentElement.classList.add("js");
// Footer year updates automatically
document.getElementById("year").textContent = new Date().getFullYear();

// Close the mobile menu after tapping a link
document.querySelectorAll(".nav nav a").forEach(function (link) {
  link.addEventListener("click", function () {
    document.body.classList.remove("open");
  });
});

// ===== Photos page: filter tabs, "coming soon" notes, click-to-enlarge =====
(function () {
  var sections = document.querySelectorAll(".photo-section");
  if (!sections.length) return;

  window.addEventListener("load", function () {
    var emptyCount = 0;
    sections.forEach(function (s) {
      if (!s.querySelector("figure:not(.empty)")) { s.classList.add("no-photos"); emptyCount++; }
    });
    var main = document.querySelector("main.wide");
    if (main && emptyCount === sections.length) main.classList.add("all-empty");
  });

  document.querySelectorAll(".tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".tab").forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");
      var f = tab.getAttribute("data-filter");
      sections.forEach(function (s) {
        s.classList.toggle("hidden", f !== "all" && s.getAttribute("data-group") !== f);
      });
    });
  });

  var box = document.getElementById("lightbox");
  document.querySelectorAll(".photo-section figure").forEach(function (fig) {
    fig.addEventListener("click", function () {
      var img = fig.querySelector("img");
      if (fig.classList.contains("empty")) return;
      box.querySelector("img").src = img.src;
      box.querySelector(".cap").textContent = fig.querySelector("figcaption").textContent;
      box.classList.add("show");
    });
  });
  box.addEventListener("click", function () { box.classList.remove("show"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") box.classList.remove("show"); });
})();

// Fade-in on scroll
(function () {
  if (!("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".card, .ministry, .step").forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
})();
