//toggles submenuDiv visibility when Main Menu Button is clicked
//call once at page initialization
export default function dropdownMenu(mainMenuButton, subMenuDiv) {
  //set visibility off initally:
  subMenuDiv.style.visibility = "hidden";

  // call back to toggle sub menu visibility when the main menu button is clicked
  mainMenuButton.addEventListener("mouseover", (e) => {
    subMenuDiv.style.visibility = "visible";
  });

  subMenuDiv.addEventListener("mouseleave", (e) => {
    subMenuDiv.style.visibility = "hidden";
  });

  mainMenuButton.addEventListener("click", (e) => {
    if (subMenuDiv.style.visibility === "visible") {
      subMenuDiv.style.visibility = "hidden";
    } else {
      subMenuDiv.style.visibility = "visible";
    }
  });
}
