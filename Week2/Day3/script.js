const buttons = document.querySelectorAll(".Rbtn");
let scoreTag = document.getElementById("score");
const isClicked = document.querySelector(".noBtnSelected");

buttons.forEach((e) => {
  e.addEventListener("click", (e) => {
    // ***********************************
    // this starts from second time, the button is clicked
    const checked = document.querySelector(".checked");

    if (checked) {
      checked.classList.remove("checked");
      checked.style.backgroundColor = "";
      checked.style.color = "var(--light-grey)";
    }
    // ***********************************

    e.target.style.backgroundColor = "var(--light-grey)";
    e.target.style.color = "white";
    e.target.classList.add("checked");

    // adding value of clicked button to score
    scoreTag.innerText = e.target.innerText;
    // console.log("score:" + scoreTag.innerText);
  });
});

document.querySelector("#submit").addEventListener("click", () => {
  let checked = document.querySelector(".checked");
  console.log(checked);
  if (!checked) {
    // alert("Please vote before submit!");
    isClicked.style.display = "block";
    setTimeout(() => {
        isClicked.style.display = "none";
    }, 2000);
  } else {
    document.querySelector(".ratingBox").style.display = "none";
    document.querySelector(".successMsg").style.display = "block";
  }
});

document.querySelector("#gobackBtn").addEventListener("click", () => {
  let checked = document.querySelector(".checked");
  checked.classList.remove("checked");
  checked.style.backgroundColor = "";
  checked.style.color = "var(--light-grey)";

  document.querySelector(".ratingBox").style.display = "block";
  document.querySelector(".successMsg").style.display = "none";
});
