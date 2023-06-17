const form = document.querySelector(".form");
const btn = document.querySelector(".searchbtn");
let img = document.createElement("img");

const input = document.querySelector("input");
const resultError = document.querySelector(".resultError");

btn.addEventListener("mouseover", () => {
  if (input.value === "") {
    btn.classList.toggle("moveLeft");
  }
});

// search button to fetch data
form.onsubmit = (e) => {
  e.preventDefault();
  let block = document.querySelector(".mainImg");

  const user = document.querySelector(".githubUser");
  const login = document.querySelector(".githubUserName");
  const joined = document.querySelector(".githubJoinedDate");
  const repo = document.querySelector(".repoTotal");
  const follower = document.querySelector(".followerTotal");
  const followings = document.querySelector(".followingTotal");
  const locations = document.querySelector(".locations");
  const twitter = document.querySelector(".twit");
  const websites = document.querySelector(".websites");
  const companies = document.querySelector(".companies");
  const gitBio = document.querySelector(".githubBio");
  const resultBody = document.querySelector(".resultBody");

  const url = `https://api.github.com/users/${input.value}`;

  const getUrl = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.message);
    // check if data is not returned
    if (data.message == "Not Found") {
      console.log("not ok");
      resultError.classList.remove(".resultError");
      resultBody.innerHTML = `
      <div class="resultError">
                <h4>No Results!</h4>
            </div>
      <div class="githubHead">
                <div class="mainImg"></div>
                <div class="githubInfo">
                    <div class="githubUser">Github Username</div>
                    <div class="githubUserName">
                        <a href="">@githubusername</a>
                    </div>
                    <div class="githubJoinedDate">Joined Date</div>
                </div>
            </div>

            <div class="githubFact">
                <div class="githubBio">Github Bio...</div>
                <div class="githubRepo">
                    <div class="repos">
                        <div class="repoHeading">Repos</div>
                        <div class="repoTotal">0</div>
                    </div>
                    <div class="followers">
                        <div class="followerHeading">Followers</div>
                        <div class="followerTotal">0</div>
                    </div>
                    <div class="following">
                        <div class="followingHeading">Following</div>
                        <div class="followingTotal">0</div>
                    </div>
                </div>

                <div class="githubSocial">
                    <div class="location">
                        <img src="images/icon-location.svg" alt="" />
                        <p class="locations">Location</p>
                    </div>
                    <div class="twitter">
                        <img src="images/icon-twitter.svg" alt="" />
                        <p class="twit">Twitter</p>
                    </div>
                    <div class="website">
                        <img src="images/icon-website.svg" alt="" />
                        <a class="websites" href="#">Website</p>
                    </div>
                    <div class="company">
                        <img src="images/icon-company.svg" alt="" />
                        <p class="companies">Company</p>
                    </div>
                </div>
            </div>`;
      return;
    }

    resultError.classList.add(".resultError");
    console.log(data);
    const dateData = data.created_at.slice(0, data.created_at.length - 10);

    img.src = data.avatar_url;
    block.appendChild(img);
    block.style.border = "none";

    user.innerHTML = data.name;
    login.innerHTML = `@${data.login}`;
    joined.innerHTML = `Joined ${dateData}`;
    repo.innerHTML = data.public_repos;
    follower.innerHTML = data.followers;
    followings.innerHTML = data.following;

    locations.innerHTML =
      data.location === "" || data.location === null
        ? "No location added"
        : data.location;
    isAvailable(data.location, locations);

    twitter.innerHTML =
      data.twitter_username === "" || data.twitter_username === null
        ? "No Twitter added"
        : data.twitter_username;
    isAvailable(data.twitter_username, twitter);

    websites.setAttribute("href", data.blog);
    websites.innerHTML =
      data.blog === "" || data.blog === null ? "No Website" : data.blog;

    isAvailable(data.blog, websites);

    companies.innerHTML =
      data.company === "" || data.company === null
        ? "No Companies"
        : data.company;
    isAvailable(data.company, companies);
    gitBio.innerHTML =
      data.bio === "" || data.bio === null
        ? "This profile has no bio"
        : data.bio;
  };

  getUrl();
  input.value = "";
};

// function to check if specific data is available or not
function isAvailable(entity, tag) {
  if (entity === "" || entity === null) {
    tag.style.opacity = 0.5;
  } else {
    tag.style.opacity = 1;
  }
}

// function to toggle themes based on click event
const toggle = (e) => {
  //   console.log(e.currentTarget.classList);
  if (e.currentTarget.classList.contains("light--hidden")) {
    document.documentElement.setAttribute("color-mode", "light");
    return;
  } else if (e.currentTarget.classList.contains("dark--hidden")) {
    document.documentElement.setAttribute("color-mode", "dark");
    return;
  } else if (e.currentTarget.classList.contains("custom--hidden")) {
    document.documentElement.setAttribute("color-mode", "custom");
    return;
  }
};

const toggleButtons = document.querySelectorAll(".color-mode_btn");
// console.log(toggleButtons);
toggleButtons.forEach((btn) => {
  btn.onclick = toggle;
});
