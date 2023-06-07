const emailFormat = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i;
const Button = document.getElementById("submitBtn");

Button.addEventListener("click", function (event) {
  event.preventDefault();
  /* ********************** Getting tags by ID ******************* */
  const fName = document.getElementById("firstNameInput");
  const lName = document.getElementById("lastNameInput");
  const email = document.getElementById("emailInput");
  const password = document.getElementById("passInput");

  /* ********************** Getting data-id attribute on error Icons ******************* */
  const fNameIcon = document.querySelector('[data-id="fname"]');
  const lNameIcon = document.querySelector('[data-id="lname"]');
  const emailIcon = document.querySelector('[data-id="emailIcon"]');
  const passIcon = document.querySelector('[data-id="passIcon"]');

  /* ********************** Getting Error p tags ******************* */
  const firstNameError = document.getElementById("firstName");
  const lastNameError = document.getElementById("lastName");
  const emailError = document.getElementById("emailerror");
  const passwordError = document.getElementById("passerror");


  /* ********************** Applying conditions to firstname ******************* */
  fName.value
    ? (firstNameError.classList.remove("display"),
      fNameIcon.classList.remove("display"),
      fName.classList.remove("borderRed"))
    : (firstNameError.classList.add("display"),
      fName.classList.add("borderRed"),
      fNameIcon.classList.add("display"));

      /* ********************** Applying conditions to lastname ******************* */
  lName.value
    ? (lastNameError.classList.remove("display"),
      lNameIcon.classList.remove("display"),
      lName.classList.remove("borderRed")
      )
    : (lastNameError.classList.add("display"),
      lNameIcon.classList.add("display"),
      lName.classList.add("borderRed")
      );

      /* ********************** Applying conditions to email ******************* */
  email.value
    ? !emailFormat.test(email.value)
      ? (
        emailError.classList.add("display"),
        emailIcon.classList.add("display"),
        email.setAttribute(
          "placeholder",
          "example@email.com"
        ),
        emailError.innerText = "Looks like this is not an email"
        )
      : (
        emailError.classList.remove("display"),
        emailIcon.classList.remove("display"),
        email.classList.remove("borderRed")
        )
    : (
      emailError.classList.add("display"),
      emailIcon.classList.add("display"),
      email.classList.add("borderRed"),
      (emailError.innerText = "Email cannot be left empty")
      );


      /* ********************** Applying conditions to password ******************* */
  password.value
    ? (passwordError.classList.remove("display"),
      passIcon.classList.remove("display"),
      password.classList.remove("borderRed"))
    : (passwordError.classList.add("display"),
      passIcon.classList.add("display"),
      password.classList.add("borderRed"));
});
