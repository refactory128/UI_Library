import "./style.css";
import index from "./index.html";
import dropdownMenu from "./dropdownMenu";
import addIconSrc from "./img/add_circle_black_24dp.svg";
import menuIconSrc from "./img/menu_black_24dp.svg";

// Generate navigation bar

function navBar(title) {
  const nav = document.createElement("div");
  nav.classList.add("nav");
  nav.classList.add("mobile");

  const h1 = document.createElement("h1");
  h1.innerHTML = title;
  h1.classList.add("navTitle");
  nav.appendChild(h1);

  const menuIcon = new Image();
  menuIcon.src = menuIconSrc;
  menuIcon.classList.add("mainMenuMobile");
  nav.appendChild(menuIcon);

  /*
  addIcon.addEventListener("click", (e) => {
    callback();
  });
  */
  const body = document.querySelector("body");
  body.appendChild(nav);

  const dropdown = document.createElement("div");
  dropdown.innerHTML = "<a>SUB MENU 1</a> <a>SUB MENU 2</a> <a>SUB MENU 3</a>";
  dropdown.classList.add("dropdownMenuMobile");
  body.appendChild(dropdown);
}

dropdownMenu(
  document.querySelector(".mainMenuButton"),
  document.querySelector(".dropdownMenu")
);

navBar("SOME SITE");

dropdownMenu(
  document.querySelector(".mainMenuMobile"),
  document.querySelector(".dropdownMenuMobile")
);

//add stuff here
const content = document.createElement("div");
content.innerHTML =
  "<p> orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>";

const body = document.querySelector("body");
body.appendChild(content);
