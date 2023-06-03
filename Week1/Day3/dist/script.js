let toggleButton = document.getElementById("toggleButton");
let mobileMenu = document.getElementById("mobile_menu");

toggleButton.onclick = () => {
  if(mobileMenu.style.display === "block"){
    mobileMenu.style.display = "none";
  }else{
    mobileMenu.style.display = "block";
  }
};
