let notifications = [
  {
    id: 1,
    profile: "./assets/images/avatar-mark-webber.webp",
    name: "Mark Webber",
    action: "reacted to your recent post",
    actedPost: "My first tournament today!",
    time: "1m ago",
    message: "",
    img: "",
    isRead: false,
  },
  {
    id: 2,
    profile: "./assets/images/avatar-angela-gray.webp",
    name: "Angela Gray",
    action: "followed you",
    actedPost: "",
    time: "5m ago",
    message: "",
    img: "",
    isRead: false,
  },
  {
    id: 3,
    profile: "./assets/images/avatar-jacob-thompson.webp",
    name: "Jacob Thompson",
    action: "has joined your group",
    actedPost: "Chess Club",
    time: "1 day ago",
    message: "",
    img: "",
    isRead: false,
  },
  {
    id: 4,
    profile: "./assets/images/avatar-rizky-hasanuddin.webp",
    name: "Rizky Hasanuddin",
    action: "sent you a private message",
    actedPost: "",
    time: "1 day ago",
    message:
      "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
    img: "",
    isRead: true,
  },
  {
    id: 5,
    profile: "./assets/images/avatar-kimberly-smith.webp",
    name: "Kimberly Smith",
    action: "commented on your picture",
    actedPost: "",
    time: "1 week ago",
    message: "",
    img: "./assets/images/image-chess.webp",
    isRead: true,
  },
  {
    id: 6,
    profile: "./assets/images/avatar-nathan-peterson.webp",
    name: "Nathan Peterson",
    action: "reacted to your recent post",
    actedPost: "5 end-game strategies to increase your win rate",
    time: "2 weeks ago",
    message: "",
    img: "",
    isRead: true,
  },
  {
    id: 7,
    profile: "./assets/images/avatar-anna-kim.webp",
    name: "Anna Kim",
    action: "left the group ",
    actedPost: "Chess Club",
    time: "2 weeks ago",
    message: "",
    img: "",
    isRead: true,
  },
];

const notifiList = document.querySelector(".notification-list");
const markAllBtn = document.querySelector(".mark-read");
const unreadNotifs = document.querySelector(".unread-num");

// render notifications first time
RenderNotifications();
// onclick handler for mark all as read
markAllBtn.onclick = () => {
  notifications.forEach((notif) => {
    notif.isRead = true;
  });
  // console.log(notifications);
  // render again notifications to see the updated change
  RenderNotifications();

  const numbers = notifications.filter((notif) => {
    return !notif.isRead;
  });

  unreadNotifs.innerText = numbers.length;

  // console.log(numbers.length);
};

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
}
