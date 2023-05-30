# Frontend Mentor - Social media dashboard with theme switcher solution

This is a solution to the [Social media dashboard with theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/social-media-dashboard-with-theme-switcher-6oY8ozp_H). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [The challenge](#the-challenge)
- [Links](#links)
- [Built with](#built-with)
- [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Toggle color theme to their preference

## Links

- Solution URL: [https://dbidmead.github.io/theme-switching-dashboard](https://dbidmead.github.io/theme-switching-dashboard)

## Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- JS for DOM manipulation and local storage
- JSON data and the JS fetch API to populate DOM information

## What I learned

### In order to theme switch, create theme objects with CSS var names as keys and their theme-dependent values as values

```js
const darkTheme = {
  "--bg-color": "hsl(230, 17%, 14%)",
  "--card-bg-color": "hsl(228, 28%, 20%)",
  "--card-hover-color": "hsl(229, 22%, 31%)",
  "--txt-color": "hsl(0, 0%, 100%)",
};

const lightTheme = {
  "--bg-color": "hsl(0, 0%, 100%)",
  "--card-bg-color": "hsl(227, 47%, 96%)",
  "--card-hover-color": "hsl(229, 54%, 90%)",
  "--txt-color": "hsl(230, 17%, 14%)",
};

function setMode(theme) {
  Object.keys(theme).forEach((varName) => {
    root.style.setProperty(varName, theme[varName]);
  });
}

setMode(lightTheme); //for example
```

The root.style.setProperty() function allows us to reassign CSS variable values. Loop over each key in the theme object, use the key string as the property to set, and use the key's value as the new property value.

### Have browser remember theme using local storage

```js
// set a default in case nothing is defined in local storage
const defaultTheme = "dark";

// set the current theme to either default or local storage value
let currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : defaultTheme;

// set the initial theme object (defined above) to render based on the string contained in currentTheme variable
let initialTheme = currentTheme == "dark" ? darkTheme : lightTheme;

// set the mode
setMode(initialTheme);

// ensure the toggle is positioned correctly on load
currentTheme == "light"
  ? toggle.classList.add("toggled")
  : toggle.classList.remove("toggled");

// toggle event listener
toggle.addEventListener("click", () => {
  // get the current theme string from local storage or default
  currentTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : defaultTheme;

  // generic toggle styling logic
  toggle.classList.toggle("toggled");
  let animation = toggle.classList.contains("toggled")
    ? "slide-right"
    : "slide-left";
  toggle.firstElementChild.classList.add(animation);
  toggle.firstElementChild.addEventListener("animationend", () => {
    toggle.firstElementChild.classList.remove(animation);
  });

  // set theme object to switch to and use it to set the mode
  let newTheme = currentTheme == "dark" ? lightTheme : darkTheme;
  setMode(newTheme);

  // update local storage to reflect the new current theme after toggle switch
  localStorage.setItem("theme", currentTheme == "light" ? "dark" : "light");
});
```

## Author

- GitHub - [@dbidmead](https://github.com/dbidmead)
- Frontend Mentor - [@dbidmead](https://www.frontendmentor.io/profile/dbidmead)
