import "./style.css";
import index from "./index.html";
import dropdownMenu from "./dropdownMenu";
import addIconSrc from "./img/add_circle_black_24dp.svg";

// Generate navigation bar
/*
function navBar(callback) {
  const nav = document.createElement("div");
  nav.classList.add("nav");

  const addIcon = new Image();
  addIcon.src = addIconSrc;
  nav.appendChild(addIcon);

  addIcon.addEventListener("click", (e) => {
    callback();
  });

  let body = document.querySelector("body");
  body.appendChild(nav);
}
*/
dropdownMenu();

//add stuff here
