// check if there is user loged in or not from local storage
const loggedInUser = localStorage.getItem("loggedInUser");
const nameofuser = document.getElementById("nameofuser");

if (!loggedInUser) {
  // if no user loged back to login
  window.location.href = "../index.html";
} else {
  var user = JSON.parse(loggedInUser);
  console.log("Welcome back, " + user.username);
    nameofuser.innerHTML=user.username;


}

// nav dropdown menu

const userImg = document.getElementById("user-img");
const dropdown = document.getElementById("dropdown-menu");
const logoutBtn = document.getElementById("logout-btn");

userImg.addEventListener("click", () => {
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
});






//logout button
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // remove user from local storage
  localStorage.removeItem("loggedInUser");
  window.location.href = "../index.html";
});


/////////////////////////////////////////////////////////////
// ✅ add post popup
const newpost_input = document.querySelector(".newposts");
const postPopup = document.getElementById("postPopup");
const closePopup = document.getElementById("closePopup");

newpost_input.addEventListener("click", () => {
  postPopup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
  postPopup.style.display = "none";
});

// close popup when user clicks outside it
window.addEventListener("click", (e) => {
  if (e.target === postPopup) {
    postPopup.style.display = "none";
  }
});
