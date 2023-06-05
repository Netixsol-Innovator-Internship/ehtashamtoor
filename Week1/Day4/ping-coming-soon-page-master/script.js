const inputEmail = document.getElementById("email");
const error = document.querySelector(".errorMessage");
const emailFormat = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i;
const btnSubmit = document.getElementById("submitBtn");

btnSubmit.onclick = () => {
  emailValidate();

  setTimeout(() => {
    error.style.visibility = "hidden";
    inputEmail.style.border = "1px solid black";
  }, 2000);
};

const emailValidate = () => {
  error.style.color = "hsl(354, 100%, 66%)";
  inputEmail.style.border = "1px solid red";
  if (inputEmail.value == "") {
    error.innerText = "Whoops! It looks like you forgot to add your email";
  } else if (!emailFormat.test(inputEmail.value)) {
    error.innerText = "Please provide a valid email address";
    inputEmail.setAttribute("placeholder", "example@email.com");
  } else {
    error.innerText = "Good Work! Hop in";
    inputEmail.setAttribute("placeholder", "");
    error.style.color = "#2ECC71";
    inputEmail.style.border = "1px solid green";
  }
  error.style.visibility = "visible";
};