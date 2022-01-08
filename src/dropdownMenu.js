//toggles submenuDiv visibility when Main Menu Button is clicked
//call once at page initialization
export default function dropdownMenu(mainMenuButton, subMenuDiv) {
  //set visibility off initally:
  console.log(mainMenuButton);
  console.log(subMenuDiv);
  subMenuDiv.style.display = "none";

  // call back to toggle sub menu visibility when the main menu button is clicked
  mainMenuButton.addEventListener("mouseover", (e) => {
    subMenuDiv.style.display = "block";
  });

  subMenuDiv.addEventListener("mouseleave", (e) => {
    subMenuDiv.style.display = "none";
  });

  mainMenuButton.addEventListener("click", (e) => {
    if (subMenuDiv.style.display === "block") {
      subMenuDiv.style.display = "none";
    } else {
      subMenuDiv.style.display = "block";
    }
  });
}
