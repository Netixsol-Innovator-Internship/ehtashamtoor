<h1 align="center">WEEK 3 DAY 1</h1>

<h2 align="center">TIME COMPLEXITIES AND ALOGORITHMS</h2>

<h1 align="center">PREVIOUS ASSIGNMENTS TIME COMPLEXITIES</h1>

<h3>WEEK 2 DAY 1</h3>

<code>
Object.keys(date).forEach((key) => {
    const value = date[key];
    if (value == "") {
      isValidateAll = false;

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
</code>

<h5>In this above code i have used a FOREACH loop, which operates on the keys of date object. the more the number of keys the more the number of iterations. So the 
<h2>Time Complexity: T = O(n)</h2>
</h5>

<h3>WEEK 2 DAY 2</h3>

<code>
function RenderNotifications() {
  notifiList.innerHTML = notifications
    .map((notif) => {
      return `<li class="notification-list-item ${
        !notif.isRead ? `unread` : ""
      }" key="${notif.id}">
        <img
          class="notification-profile-img"
          src="${notif.profile}"
          alt="profile"
        />
        <div class=" ${
          notif.img ? `notification-content-flex` : `notification-content`
        }">
          <div class="notification-text">
            <h5 class="name">${notif.name}</h5>
            <p>
              ${notif.action}
              <a class="notification-link-post">${notif.actedPost}</a>
            </p>
            ${!notif.isRead ? `<div class="unread-icon"></div>` : ""}
            <div class="time-past">${notif.time}</div>
            </div>
            ${
              notif.message &&
              `<div class="notification-message">${notif.message}</div>`
            }
          ${
            notif.img &&
            `<img class="notification-post-img" src="${notif.img}" alt="picture" />`
          }
        </div>
      </li>`;
    })
    .join("");
}</code>

<h5>In this above code i have used a function which uses a map function to iterate over an array of objects. so assume notifications as n. So the if the number of objects increases the time complexity increases, the number of iterations increases linearly.
<h2>Time Complexity: T = O(n)</h2>
</h5>

<h3>WEEK 2 DAY 3</h3>

<code>
buttons.forEach((e) => {
  e.addEventListener("click", (e) => {
    const checked = document.querySelector(".checked");

    if (checked) {
      checked.classList.remove("checked");
      checked.style.backgroundColor = "";
      checked.style.color = "var(--light-grey)";
    }

    e.target.style.backgroundColor = "var(--light-grey)";
    e.target.style.color = "white";
    e.target.classList.add("checked");

    scoreTag.innerText = e.target.innerText;

});
});
</code>

<h5>In this above code i have used a FOREACH loop which runs its number of iterations on the number of buttons it is given. So if the number of buttons is increases, the number of iterations increases.
<h2>Time Complexity: T = O(n)</h2>
</h5>

<h3>WEEK 2 DAY 4</h3>

<code>
tipPercentButtons.forEach((btn) => {
  btn.onclick = handleBtnClick;
});
</code>

<h5>In this above code i have used a FOREACH loop for tipPercentButtons depending on the numbers of the buttons. As number of buttons increase then number of iterations increases
<h2>Time Complexity: T = O(n)</h2>
</h5>

<h4>DAY 5, 6 Have constant complexiities as they have no loops in them, they just contains the conditionals, assignments etc</h4>
