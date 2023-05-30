const root = document.querySelector(":root");

const darkTheme = {
  "--bg-color": "hsl(230, 17%, 14%)",
  "--bg-color-top": "hsl(232, 19%, 15%)",
  "--card-bg-color": "hsl(228, 28%, 20%)",
  "--card-hover-color": "hsl(229, 22%, 31%)",
  "--lg-txt-color": "hsl(0, 0%, 100%)",
  "--sm-txt-color": "hsl(228, 34%, 66%)",
};

const lightTheme = {
  "--bg-color": "hsl(0, 0%, 100%)",
  "--bg-color-top": "hsl(225, 100%, 98%)",
  "--card-bg-color": "hsl(227, 47%, 96%)",
  "--card-hover-color": "hsl(229, 54%, 90%)",
  "--lg-txt-color": "hsl(230, 17%, 14%)",
  "--sm-txt-color": "hsl(228, 12%, 44%)",
};

const toggle = document.querySelector(".toggle");

let isModeDark = true;

toggle.addEventListener("click", () => {
  toggle.classList.toggle("toggled");
  let animation = toggle.classList.contains("toggled")
    ? "slide-right"
    : "slide-left";
  toggle.firstElementChild.classList.add(animation);
  toggle.firstElementChild.addEventListener("animationend", () => {
    toggle.firstElementChild.classList.remove(animation);
  });
  let newTheme = isModeDark ? lightTheme : darkTheme;
  setMode(newTheme);
  isModeDark = !isModeDark;
});

function setMode(theme) {
  Object.keys(theme).forEach((varName) => {
    root.style.setProperty(varName, theme[varName]);
  });
}
