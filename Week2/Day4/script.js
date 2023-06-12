// handful variables
let tipPercent = 0;
let isClicked = false;

// getting all the tags to be used
const billInput = document.querySelector("#bill-input");
const tipPercentButtons = document.querySelectorAll(".tip-percent");
const persons = document.querySelector("#persons");
const customInput = document.querySelector("#custom");
const error = document.querySelector("#error");

// when custom input is out of focus
customInput.addEventListener("blur", () => {
  const customValue = parseFloat(customInput.value);
  if (customValue < 1) {
    customInput.value = 1;
  }
  if (customValue > 100) {
    customInput.value = 100;
  }
  removeClassClicked();
  isClicked = false;
});

function handleBtnClick(e) {
  const btn = e.target;
  removeClassClicked();
  let value = e.target.innerText.slice(0, -1);
  if (value === "5") {
    fivePercent();
  } else if (value === "10") {
    TenPercent();
  } else if (value === "15") {
    FifteenPercent();
  } else if (value === "25") {
    TwentyFivePercent();
  } else if (value === "50") {
    FiftyPercent();
  }

  btn.classList.add("clicked");
  isClicked = true;
  customInput.value = "";
}

tipPercentButtons.forEach((btn) => {
  btn.onclick = handleBtnClick;
});

const resetBtn = document.querySelector("#reset-btn");
const calcBtn = document.querySelector("#calc-btn");

// onclick function to calculate the final result after checking validations
calcBtn.onclick = () => {
  // validation for bill amount
  if (billInput.value == "") {
    error.innerText = "Bill Value is empty";
    return;
  }
  // validation for tip percent
  if (isClicked == false && customInput.value == "") {
    error.innerText = "Choose tip percent";
    return;
  }
  // validation for no of persons
  if (persons.value == 0) {
    error.innerText = "Can't be zero/null";
    console.log(persons);
    persons.style.border = "2px solid rgb(231 72 72)";
    return;
  }
  error.innerText = "";
  persons.style.border = "none";
  const billValue = parseFloat(billInput.value);
  const No_of_persons = parseFloat(persons.value);
  let customValue = parseFloat(customInput.value);

  if (customInput.value == "") {
    customValue = 0;
    handleMath(billValue, No_of_persons, customValue);
  } else {
    handleMath(billValue, No_of_persons, customValue);
  }
};

// function to reset all tags to their initial states
resetBtn.addEventListener("click", function () {
  tipPercent = 0;
  document.querySelector("#tip-amount").innerHTML = "$0.00";
  document.querySelector("#total").innerHTML = "$0.00";
  billInput.value = null;
  persons.value = null;
  customInput.value = null;
  tipPercentButtons.forEach(function (button) {
    button.classList.remove("clicked");
  });
});

// BELOW functions to set percentage value e.g. 15% then tipPercent = 15/100 = 0.15
function fivePercent() {
  tipPercent = 0.05;
}
function TenPercent() {
  tipPercent = 0.1;
}
function FifteenPercent() {
  tipPercent = 0.15;
}
function TwentyFivePercent() {
  tipPercent = 0.25;
}
function FiftyPercent() {
  tipPercent = 0.5;
}
// ABOVE functions to set percentage value e.g. 15% then tipPercent = 15/100 = 0.15

// function to remove styling on percente buttons
function removeClassClicked() {
  tipPercentButtons.forEach(function (button) {
    button.classList.remove("clicked");
  });
}

// function which calculates the tip and total
function handleMath(billValue, No_of_persons, customValue) {
  let total = 0;
  let Finaltip = 0;
  let tipValue = 0;
  if (customValue == 0) {
    tipValue = billValue * tipPercent;
    Finaltip = (billValue * tipPercent) / No_of_persons;
    total = (billValue + tipValue) / No_of_persons;
  } else {
    tipValue = (billValue * customValue) / 100;
    Finaltip = (billValue * customValue) / 100 / No_of_persons;
    total = (billValue + tipValue) / No_of_persons;
  }

  //   console.log(Finaltip, total, tipValue);
  document.querySelector("#tip-amount").innerHTML = "$" + Finaltip.toFixed(2);
  document.querySelector("#total").innerHTML = "$" + total.toFixed(2);
}
