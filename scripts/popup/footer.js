document.addEventListener("DOMContentLoaded", () => {
  const footerNavButtons = document.querySelectorAll(".footer__nav-item");

  const sections = {
    "Blocked List": document.querySelector("#blocked-list-tab"),
    "Current Site": document.querySelector("#current-website-tab"),
    "Add to List": document.querySelector("#add-to-list-tab"),
  };

  sections["Current Site"].style.display = "block";

  footerNavButtons.forEach((navButton) => {
    navButton.addEventListener("click", () => {
      const tabName = navButton.querySelector("p").textContent;

      footerNavButtons.forEach((btn) => btn.classList.remove("active"));
      navButton.classList.add("active");

      Object.entries(sections).forEach(([name, section]) => {
        section.style.display = name === tabName ? "block" : "none";
      });
    });
  });
});
