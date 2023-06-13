const CompanyBtn = document.querySelector(".CompanyArrow");
const CompanyBox = document.querySelector("#CompanyBox");
const FeaturesBtn = document.querySelector(".FeaturesArrow");
const FeaturesBox = document.querySelector("#FeaturesBox");
const insideListComp = document.querySelector(".insideListComp");
const insideList = document.querySelector(".insideList");
const NavtoggleBtn = document.querySelector(".NavtoggleBtn");
const navLinks = document.querySelector(".btns");
const DarkBg = document.querySelector(".darkenBg");
const body = document.querySelector("body");

// click event to show COMPANY NAVLINK DROPDOWN
CompanyBox.addEventListener("click", () => {
  insideListComp.classList.toggle("showList");
  if (insideListComp.classList.contains("showList")) {
    CompanyBtn.setAttribute("src", "images/icon-arrow-up.svg");
  } else {
    CompanyBtn.setAttribute("src", "images/icon-arrow-down.svg");
  }
});
// Click event to show Features Navlink dropdown
FeaturesBox.addEventListener("click", () => {
  insideList.classList.toggle("showList");
  if (insideList.classList.contains("showList")) {
    FeaturesBtn.setAttribute("src", "images/icon-arrow-up.svg");
  } else {
    FeaturesBtn.setAttribute("src", "images/icon-arrow-down.svg");
  }
});

// toggler button for navbar on small screens
NavtoggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("showBtns");
  body.classList.toggle("clickedMenu");
  if (navLinks.classList.contains("showBtns")) {
    DarkBg.style.display = "initial";
    NavtoggleBtn.setAttribute("src", "images/icon-close-menu.svg");
  } else {
    NavtoggleBtn.setAttribute("src", "images/icon-menu.svg");
    DarkBg.style.display = "none";
  }
});
