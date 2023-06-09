const Errors = document.querySelectorAll(".errormessage");
const Labels = document.querySelectorAll(".label");
const dateShow = document.querySelectorAll(".dateShow");
const form = document.querySelector("#form");
const currentYear = new Date().getFullYear();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = {
    year: form.year.value,
    month: form.month.value,
    day: form.day.value,
  };

  let isValidateAll = true;

  //   checking empty values for day, month, year

  Object.keys(date).forEach((key) => {
    const value = date[key];

    if (value == "") {
      isValidateAll = false;
      // console.log("value: --")

      if (key === "year") {
        form.year.style.borderColor = "hsl(0, 100%, 67%)";
        Labels[2].style.color = "hsl(0, 100%, 67%)";
        Errors[2].innerText = "This field is required";
      } else if (key === "month") {
        form.month.style.borderColor = "hsl(0, 100%, 67%)";
        Labels[1].style.color = "hsl(0, 100%, 67%)";
        Errors[1].innerText = "This field is required";
      } else if (key === "day") {
        form.day.style.borderColor = "hsl(0, 100%, 67%)";
        Labels[0].style.color = "hsl(0, 100%, 67%)";
        Errors[0].innerText = "This field is required";
      }
    } else {
      // console.log("value: else")
      if (key === "year") {
        form.year.style.borderColor = "hsl(0, 0%, 86%)";
        Labels[2].style.color = "hsl(0, 1%, 44%)";
        Errors[2].innerText = "";
      } else if (key === "month") {
        form.month.style.borderColor = "hsl(0, 0%, 86%)";
        Labels[1].style.color = "hsl(0, 1%, 44%)";
        Errors[1].innerText = "";
      } else if (key === "day") {
        form.day.style.borderColor = "hsl(0, 0%, 86%)";
        Labels[0].style.color = "hsl(0, 1%, 44%)";
        Errors[0].innerText = "";
      }
    }
  });

  const { day, month, year } = date;

  let isValidate = true;

  // Validating day
  if (isValidateAll) {
    if (!isDayValid(day)) {
      isValidate = false;
      Labels[0].style.color = "hsl(0, 100%, 67%)";
      Errors[0].innerText = "Must be a valid day";
      form.day.style.borderColor = "hsl(0, 100%, 67%)";
    } else {
      Errors[0].innerText = "";
      Labels[0].style.color = "hsl(0, 1%, 44%)";
      form.day.style.borderColor = "hsl(0, 0%, 86%)";
    }

    // validating month
    if (!isMonthValid(month)) {
      isValidate = false;
      form.month.style.borderColor = "hsl(0, 100%, 67%)";
      Labels[1].style.color = "hsl(0, 100%, 67%)";
      Errors[1].innerText = "Must be a valid month";
    } else {
      Errors[1].innerText = "";
      Labels[1].style.color = "hsl(0, 1%, 44%)";
      form.month.style.borderColor = "hsl(0, 0%, 86%)";
    }

    // validatin year
    if (year > currentYear) {
      isValidate = false;
      form.year.style.borderColor = "hsl(0, 100%, 67%)";
      Errors[2].innerText = "Must be in the past";
      Labels[2].style.color = "hsl(0, 100%, 67%)";
    } else {
      Errors[2].innerText = "";
      Labels[2].style.color = "hsl(0, 1%, 44%)";
      form.year.style.borderColor = "hsl(0, 0%, 86%)";
    }

    if (isValidate) {
      const intDate = new Date(year, month - 1, day);
      const today = new Date();
      today.getFullYear();
      // console.log(today.getFullYear());
      today.getMonth();
      today.getDate();

      if (!isDateValidate(day, month, year) || intDate > today) {
        Errors[0].innerText = "Must be a valid date";
        Labels[0].style.color = "hsl(0, 100%, 67%)";
        Labels[1].style.color = "hsl(0, 100%, 67%)";
        Labels[2].style.color = "hsl(0, 100%, 67%)";
        form.day.style.borderColor = "hsl(0, 100%, 67%)";
        form.month.style.borderColor = "hsl(0, 100%, 67%)";
        form.year.style.borderColor = "hsl(0, 100%, 67%)";
      } else {
        Errors[0].innerText = "";
        Labels[0].style.color = "hsl(0, 1%, 44%)";
        Labels[1].style.color = "hsl(0, 1%, 44%)";
        Labels[2].style.color = "hsl(0, 1%, 44%)";
        form.day.style.borderColor = "hsl(0, 0%, 86%)";
        form.month.style.borderColor = "hsl(0, 0%, 86%)";
        form.year.style.borderColor = "hsl(0, 0%, 86%)";
      }
    }
  }

  const daysError = Errors[0].textContent;
  // console.log(daysError.length)
  const monthError = Errors[1].textContent;
  const yearError = Errors[2].textContent;

  if (
    daysError.length == 0 &&
    monthError.length == 0 &&
    yearError.length == 0
  ) {
    const { years, months, days } = calculateAge(day, month, year);
    dateShow[0].innerHTML = `${years} `;
    dateShow[1].innerHTML = `${months} `;
    dateShow[2].innerHTML = `${days} `;
  } else {
    dateShow[0].innerHTML = "-- ";
    dateShow[1].innerHTML = "-- ";
    dateShow[2].innerHTML = "-- ";
  }
});

function isMonthValid(month) {
  return month >= 1 && month <= 12;
}

function isDayValid(day) {
  return day >= 1 && day <= 31;
}

function isDateValidate(day, month, year) {
  const date = new Date(year, month - 1, day);
  // console.log(date.getDate() === parseInt(day));
  return date.getDate() === parseInt(day);
}

function calculateAge(day, month, year) {
  const birthdate = new Date(year, month - 1, day);
  // console.log(birthdate)
  const today = new Date();

  let ageYears = today.getFullYear() - birthdate.getFullYear();
  let ageMonths = today.getMonth() - birthdate.getMonth();
  let ageDays = today.getDate() - birthdate.getDate();

  console.log(ageYears, ageMonths, ageDays)

  if (ageDays < 0) {
    // If the day of the birthdate is greater than the day of today, subtract one month from the age in months
    ageMonths--;
    // console.log(ageMonths)
    ageDays += new Date(year, month, 0).getDate(); // Get the number of days in the previous month
    // console.log(new Date(year, month, 0).getDate())
    console.log(ageDays)
  }

  if (ageMonths < 0) {
    // If the month of the birthdate is greater than the month of today, subtract one year from the age in years
    ageYears--;
    // console.log(ageYears)
    ageMonths += 12;
    // console.log(ageMonths)
  }

  return { years: ageYears, months: ageMonths, days: ageDays };
}
