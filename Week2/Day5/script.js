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
  changeCompanyArrow();
});
// Click event to show Features Navlink dropdown
FeaturesBox.addEventListener("click", () => {
  insideList.classList.toggle("showList");
  changeFeatureArrow();
});

body.onclick = (e) => {
  // console.log(e.target);
  const tag = e.target;
  //  remove showList class from company dropdown by clicking anywhere other than navlinks
  if (
    !CompanyBox.contains(tag) &&
    insideListComp.classList.contains("showList")
  ) {
    insideListComp.classList.remove("showList");
    changeCompanyArrow();
  }

  //  remove showList class from features dropdown by clicking anywhere other than navlinks
  if (!FeaturesBox.contains(tag) && insideList.classList.contains("showList")) {
    insideList.classList.remove("showList");
    changeFeatureArrow();
  }
};

const changeFeatureArrow = () => {
  if (insideList.classList.contains("showList")) {
    FeaturesBtn.setAttribute("src", "images/icon-arrow-up.svg");
  } else {
    FeaturesBtn.setAttribute("src", "images/icon-arrow-down.svg");
  }
};

const changeCompanyArrow = () => {
  if (insideListComp.classList.contains("showList")) {
    CompanyBtn.setAttribute("src", "images/icon-arrow-up.svg");
  } else {
    CompanyBtn.setAttribute("src", "images/icon-arrow-down.svg");
  }
};

// toggler button for navbar on small screens
NavtoggleBtn.addEventListener("click", () => {
  // navLinks.classList.toggle("showBtns");
  if (navLinks.classList.contains("showBtns")) {
    body.classList.remove("side-navbar", "showBtns");
    navLinks.classList.remove("showBtns");
  } else if (!navLinks.classList.contains("showBtns")) {
    body.classList.add("side-navbar", "showBtns");
    navLinks.classList.add("showBtns");
  }
  if (navLinks.classList.contains("showBtns")) {
    DarkBg.style.display = "initial";
    NavtoggleBtn.setAttribute("src", "images/icon-close-menu.svg");
  } else {
    NavtoggleBtn.setAttribute("src", "images/icon-menu.svg");
    DarkBg.style.display = "none";
  }
});
