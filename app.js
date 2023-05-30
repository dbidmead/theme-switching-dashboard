const root = document.querySelector(":root");

const followerDisplays = document.querySelectorAll(".followers-display");
setSocialMediaPlatforms(followerDisplays);
const followerUpdateDisplays = document.querySelectorAll(".update-display");
setSocialMediaPlatforms(followerUpdateDisplays);
const todayDisplays = document.querySelectorAll(".number-display");
setSocialMediaPlatforms(todayDisplays);
const todayUpdateDisplays = document.querySelectorAll(".percent");
setSocialMediaPlatforms(todayUpdateDisplays);

const data = await fetch("./data.json").then((res) => res.json());

setDataValues();

function setDataValues() {
  followerDisplays.forEach((display) => {
    display.textContent = data[display.socialMediaPlatform].followers;
  });
  followerUpdateDisplays.forEach((display) => {
    display.textContent = data[display.socialMediaPlatform].followersToday;
  });
  todayDisplays.forEach((display) => {
    let displayParent = display.parentElement.parentElement;
    display.textContent = displayParent.classList.contains("views")
      ? data[display.socialMediaPlatform].views.value
      : data[display.socialMediaPlatform].likes.value;
  });
  todayUpdateDisplays.forEach((display) => {
    let displayParent = display.parentElement.parentElement;
    display.textContent = displayParent.classList.contains("views")
      ? data[display.socialMediaPlatform].views.percent + "%"
      : data[display.socialMediaPlatform].likes.percent + "%";
  });
}

function setSocialMediaPlatforms(array) {
  array.forEach((display) => {
    display.socialMediaPlatform =
      display.classList[display.classList.length - 1];
  });
}

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

const defaultTheme = "dark";
let currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : defaultTheme;
let initialTheme = currentTheme == "dark" ? darkTheme : lightTheme;
setMode(initialTheme);
currentTheme == "light"
  ? toggle.classList.add("toggled")
  : toggle.classList.remove("toggled");

// localStorage.clear();

toggle.addEventListener("click", () => {
  currentTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : defaultTheme;
  toggle.classList.toggle("toggled");
  let animation = toggle.classList.contains("toggled")
    ? "slide-right"
    : "slide-left";
  toggle.firstElementChild.classList.add(animation);
  toggle.firstElementChild.addEventListener("animationend", () => {
    toggle.firstElementChild.classList.remove(animation);
  });

  let newTheme = currentTheme == "dark" ? lightTheme : darkTheme;
  setMode(newTheme);
  localStorage.setItem("theme", currentTheme == "light" ? "dark" : "light");
});

function setMode(theme) {
  Object.keys(theme).forEach((varName) => {
    root.style.setProperty(varName, theme[varName]);
  });
}
