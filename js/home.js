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


// get posts 
fetchPosts();



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
const newpost_input = document.querySelector(".newpost_input");
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






//add post
document.getElementById("submitPost").addEventListener("click", function () {
  const content = document.getElementById("postContent").value.trim();

  if (content === "") {
    alert("Please write something.");
    return;
  }

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const author = loggedInUser.username;
  const date = new Date().toLocaleString();

  const newPost = {
    content: content,
    author: author,
    date: date
  };

  const req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/posts", true);
  req.setRequestHeader("Content-Type", "application/json");

  req.onload = function () {
    if (req.status === 201) {
      // alert("Post added!");
      document.getElementById("postContent").value = "";
      popup.style.display = "none";

      fetchPosts();
    } else {
      alert("Failed to add post.");
    }
  };


  req.send(JSON.stringify(newPost));
});



//show posts
function fetchPosts() {
  const req = new XMLHttpRequest();
  req.open("GET", "http://localhost:3000/posts", true);

  req.onload = function () {
    if (req.status === 200) {
      const posts = JSON.parse(req.responseText);

      const postsContainer = document.getElementById("postsContainer");
      postsContainer.innerHTML = ""; // نفضي المحتوى قبل ما نعرض من جديد

      posts.reverse().forEach(function (post) {
        const postElement = document.createElement("div");
        postElement.className = "post-card";
        postElement.innerHTML = `
        <h2>${post.author}<h3> 
        <hr>
        <p>${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
      });
    } else {
      alert("Failed to load posts.");
    }
  };

  req.onerror = function () {
    alert("Error connecting to server.");
  };

  req.send();
}

