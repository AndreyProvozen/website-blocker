const footerNavButtons = document.querySelectorAll(".footer__nav-item");

const sections = {
  "Blocked List": document.querySelector(".main__blocked-list"),
  "Current Site": document.querySelector(".main__current-website"),
  "Add to List": document.querySelector(".main__add-to-blocked-list"),
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
