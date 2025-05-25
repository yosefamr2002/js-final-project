// // check if there is user loged in or not from local storage
// const loggedInUser = localStorage.getItem("loggedInUser");
// const nameofuser = document.getElementById("nameofuser");

// if (!loggedInUser) {
//   // if no user loged back to login
//   window.location.href = "../index.html";
// } else {
//   var user = JSON.parse(loggedInUser);
//   console.log("Welcome back, " + user.username);
//   nameofuser.innerHTML = user.username;
// }

// // get posts
// fetchPosts();

// // nav dropdown menu

// const userImg = document.getElementById("user-img");
// const dropdown = document.getElementById("dropdown-menu");
// const logoutBtn = document.getElementById("logout-btn");

// userImg.addEventListener("click", () => {
//   if (dropdown.style.display === "block") {
//     dropdown.style.display = "none";
//   } else {
//     dropdown.style.display = "block";
//   }
// });

// //logout button
// logoutBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   // remove user from local storage
//   localStorage.removeItem("loggedInUser");
//   window.location.href = "../index.html";
// });

// /////////////////////////////////////////////////////////////
// // add post popup
// const newpost_input = document.querySelector(".newpost_input");
// const postPopup = document.getElementById("postPopup");
// const closePopup = document.getElementById("closePopup");

// newpost_input.addEventListener("click", () => {
//   postPopup.style.display = "flex";
// });

// closePopup.addEventListener("click", () => {
//   postPopup.style.display = "none";
// });

// // close popup when user clicks outside it
// window.addEventListener("click", (e) => {
//   if (e.target === postPopup) {
//     postPopup.style.display = "none";
//   }
// });

// //add post
// document.getElementById("submitPost").addEventListener("click", function () {
//   const content = document.getElementById("postContent").value.trim();

//   if (content === "") {
//     alert("Please write something.");
//     return;
//   }

//   const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//   const author = loggedInUser.username;
//   const date = new Date().toLocaleString();

//   const newPost = {
//     content: content,
//     author: author,
//     date: date,
//   };

//   const req = new XMLHttpRequest();
//   req.open("POST", "http://localhost:3000/posts", true);
//   req.setRequestHeader("Content-Type", "application/json");

//   req.onload = function () {
//     if (req.status === 201) {
//       // alert("Post added!");
//       document.getElementById("postContent").value = "";
//       popup.style.display = "none";

//       fetchPosts();
//     } else {
//       alert("Failed to add post.");
//     }
//   };

//   req.send(JSON.stringify(newPost));
// });

// //show posts

// function fetchPosts() {
//   var req = new XMLHttpRequest();
//   req.open("GET", "http://localhost:3000/posts", true);

//   req.onload = function () {
//     if (req.status === 200) {
//       var posts = JSON.parse(req.responseText);
//       var postsContainer = document.getElementById("postsContainer");
//       postsContainer.innerHTML = "";

//       // عرض البوستات بالعكس
//       for (var i = posts.length - 1; i >= 0; i--) {
//         var post = posts[i];

//         var postElement = document.createElement("div");
//         postElement.className = "post-card";

//         // تجهيز تعليقات البوست
//         var commentsHTML = "";
//         if (post.comments && post.comments.length > 0) {
//           for (var j = 0; j < post.comments.length; j++) {
//             var comment = post.comments[j];
//             commentsHTML +=
//               "<p><b>" + comment.author + ":</b> " + comment.content + "</p>";
//           }
//         }

//         postElement.innerHTML =
//           '<div class="fb-post">' +
//           '<div class="fb-post-header">' +
//           '<img src="../assets/images/userphoto.png" alt="User Photo" class="user-img" />' +
//           '<div class="user-info">' +
//           "<h4>" +
//           post.author +
//           "</h4>" +
//           "</div>" +
//           "</div>" +
//           '<div class="fb-post-content">' +
//           "<p>" +
//           post.content +
//           "</p>" +
//           "</div>" +
//           '<div class="fb-post-actions">' +
//           '<button class="comment-btn" data-postid="' +
//           post.id +
//           '">💬 Comment</button>' +
//           "</div>" +
//           '<div class="comments-container">' +
//           commentsHTML +
//           "</div>" +
//           '<div class="add-comment" style="display:none;">' +
//           '<input type="text" class="comment-input" placeholder="Write a comment..." />' +
//           '<button class="submit-comment-btn" data-postid="' +
//           post.id +
//           '">Add</button>' +
//           "</div>" +
//           "</div>";

//         postsContainer.appendChild(postElement);
//       }

//       // ربط أزرار التعليقات بعد إنشاء كل البوستات
//       var commentButtons = document.getElementsByClassName("comment-btn");
//       var submitButtons = document.getElementsByClassName("submit-comment-btn");
//       var addCommentDivs = document.getElementsByClassName("add-comment");

//       for (var k = 0; k < commentButtons.length; k++) {
//         commentButtons[k].onclick = function () {
//           // Get the <div> that contains the comment input box to show or hide it
//           var addDiv = this.parentElement.nextElementSibling.nextElementSibling;
//           if (addDiv.style.display === "none") {
//             addDiv.style.display = "block";
//           } else {
//             addDiv.style.display = "none";
//           }
//         };
//       }

//       for (var m = 0; m < submitButtons.length; m++) {
//         submitButtons[m].onclick = function () {
//           var postId = this.getAttribute("data-postid");
//           var input = this.previousElementSibling;
//           var commentText = input.value.trim();

//           if (commentText === "") {
//             alert("Please write a comment.");
//             return;
//           }

//           var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//           var commentAuthor = loggedInUser.username;
//           var commentDate = new Date().toLocaleString();

//           // get the post again to update comments
//           var getReq = new XMLHttpRequest();
//           getReq.open("GET", "http://localhost:3000/posts/" + postId, true);
//           getReq.onload = function () {
//             if (getReq.status === 200) {
//               var post = JSON.parse(getReq.responseText);

//               if (!post.comments) {
//                 post.comments = [];
//               }
//               post.comments.push({
//                 author: commentAuthor,
//                 content: commentText,
//                 date: commentDate,
//               });

//               // update post by  PATCH
//               var patchReq = new XMLHttpRequest();
//               patchReq.open(
//                 "PATCH",
//                 "http://localhost:3000/posts/" + postId,
//                 true
//               );
//               patchReq.setRequestHeader("Content-Type", "application/json");
//               patchReq.onload = function () {
//                 if (patchReq.status === 200) {
//                   fetchPosts(); // إعادة تحميل البوستات بعد التحديث
//                 }
//               };

//               patchReq.send(JSON.stringify({ comments: post.comments }));
//             }
//           };

//           getReq.send();

//           input.value = "";
//           this.parentElement.style.display = "none";
//         };
//       }
//     }
//   };

//   req.send();
// }

// check if there is user logged in or not from local storage
const loggedInUser = localStorage.getItem("loggedInUser");
const nameofuser = document.getElementById("nameofuser");

if (!loggedInUser) {
  // if no user logged in, back to login
  window.location.href = "../index.html";
} else {
  var user = JSON.parse(loggedInUser);
  console.log("Welcome back, " + user.username);
  nameofuser.innerHTML = user.username;
}

// get posts
fetchPosts();

// nav dropdown menu
const userImg = document.getElementById("user-img");
const dropdown = document.getElementById("dropdown-menu");
const logoutBtn = document.getElementById("logout-btn");

userImg.addEventListener("click", () => {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

// logout button
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("loggedInUser");
  window.location.href = "../index.html";
});

// add post popup
const newpost_input = document.querySelector(".newpost_input");
const postPopup = document.getElementById("postPopup");
const closePopup = document.getElementById("closePopup");

newpost_input.addEventListener("click", () => {
  postPopup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
  postPopup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === postPopup) {
    postPopup.style.display = "none";
  }
});

// add post
document.getElementById("submitPost").addEventListener("click", function () {
  const content = document.getElementById("postContent").value.trim();

  if (content === "") {
    alert("You must write something!"); // Show alert message

    return;
  }

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const author = loggedInUser.username;
  const date = new Date().toLocaleString();

  const newPost = {
    content: content,
    author: author,
    date: date,
  };

  const req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/posts", true);
  req.setRequestHeader("Content-Type", "application/json");

  req.onload = function () {
    if (req.status === 201) {
      document.getElementById("postContent").value = "";
      postPopup.style.display = "none";
      fetchPosts();
    }
  };

  req.send(JSON.stringify(newPost));
});

// show posts
function fetchPosts() {
  var req = new XMLHttpRequest();
  req.open("GET", "http://localhost:3000/posts", true);

  req.onload = function () {
    if (req.status === 200) {
      var posts = JSON.parse(req.responseText);
      var postsContainer = document.getElementById("postsContainer");
      postsContainer.innerHTML = "";

      for (var i = posts.length - 1; i >= 0; i--) {
        var post = posts[i];

        var postElement = document.createElement("div");
        postElement.className = "post-card";

        var commentsHTML = "";
        if (post.comments && post.comments.length > 0) {
          for (var j = 0; j < post.comments.length; j++) {
            var comment = post.comments[j];
            commentsHTML +=
              "<p><b>" + comment.author + ":</b> " + comment.content + "</p>";
          }
        }

        postElement.innerHTML = `
  <div class="fb-post">
    <div class="fb-post-header">
      <img src="../assets/images/userphoto.png" alt="User Photo" class="user-img" />
      <div class="user-info">
        <h4>${post.author}</h4>
      </div>
    </div>
    <div class="fb-post-content">
      <p>${post.content}</p>
    </div>
    <div class="fb-post-actions">
      <button class="comment-btn" data-postid="${post.id}"> Comment</button>
      <button class="edit-btn" data-postid="${post.id}"> Edit</button>
      <button class="delete-btn" data-postid="${post.id}"> Delete</button>
    </div>
    <div class="comments-container">
      ${commentsHTML}
    </div>
    <div class="add-comment" style="display:none;">
      <input type="text" class="comment-input" placeholder="Write a comment..." />
      <button class="submit-comment-btn" data-postid="${post.id}">Add</button>
    </div>
  </div>
`;

        postsContainer.appendChild(postElement);
      }

      // comment buttons
      var commentButtons = document.getElementsByClassName("comment-btn");
      var submitButtons = document.getElementsByClassName("submit-comment-btn");
      var addCommentDivs = document.getElementsByClassName("add-comment");
      var editButtons = document.getElementsByClassName("edit-btn");
      var deleteButtons = document.getElementsByClassName("delete-btn");

      // comment input show and hide
      for (var k = 0; k < commentButtons.length; k++) {
        commentButtons[k].onclick = function () {
          var addDiv = this.parentElement.nextElementSibling.nextElementSibling;
          addDiv.style.display =
            addDiv.style.display === "block" ? "none" : "block";
        };
      }

      // add comment
      for (var m = 0; m < submitButtons.length; m++) {
        submitButtons[m].onclick = function () {
          var postId = this.getAttribute("data-postid");
          var input = this.previousElementSibling;
          var commentText = input.value.trim();

          if (commentText === "") {
            return;
          }

          // get name of user that comment from local storage
          var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
          var commentAuthor = loggedInUser.username;
          var commentDate = new Date().toLocaleString();

          var getReq = new XMLHttpRequest();
          getReq.open("GET", "http://localhost:3000/posts/" + postId, true);
          getReq.onload = function () {
            if (getReq.status === 200) {
              var post = JSON.parse(getReq.responseText);

              if (!post.comments) {
                post.comments = [];
              }
              post.comments.push({
                author: commentAuthor,
                content: commentText,
                date: commentDate,
              });

              var patchReq = new XMLHttpRequest();
              patchReq.open(
                "PATCH",
                "http://localhost:3000/posts/" + postId,
                true
              );
              patchReq.setRequestHeader("Content-Type", "application/json");
              patchReq.onload = function () {
                if (patchReq.status === 200) {
                  fetchPosts();
                }
              };

              patchReq.send(JSON.stringify({ comments: post.comments }));
            }
          };

          getReq.send();

          input.value = "";
          this.parentElement.style.display = "none";
        };
      }

      // edit post button
      var editButtons = document.querySelectorAll(".edit-btn");
      for (var i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", function () {
          // Get the ID of the post from the button attribute
          var postId = this.getAttribute("data-postid");
          var postCard = this.closest(".post-card");
          var contentP = postCard.querySelector(".fb-post-content p");

          // Save the original post text
          var originalContent = contentP.textContent;

          var textarea = document.createElement("textarea");
          textarea.value = originalContent;
          textarea.style.width = "100%";
          textarea.style.height = "50px";

          // Replace the paragraph with the textarea
          contentP.replaceWith(textarea);

          // Change the button text to "Save"
          this.textContent = " Save";

          // Save reference to the button
          var saveBtn = this;

          // When user clicks "Save"
          saveBtn.addEventListener("click", function () {
            var newText = textarea.value.trim();

           // Create PATCH request to update the post
            var xhr = new XMLHttpRequest();
            xhr.open("PATCH", "http://localhost:3000/posts/" + postId);
            xhr.setRequestHeader("Content-Type", "application/json");

            // When request is done
            xhr.onload = function () {
              if (xhr.status === 200) {
                // Create new <p> with updated text
                var newP = document.createElement("p");
                newP.textContent = newText;

                // Replace textarea with new <p>
                postCard.querySelector("textarea").replaceWith(newP);

                // Change button text back to "Edit"
                saveBtn.textContent = " Edit";
              }
            };

            xhr.send(JSON.stringify({ content: newText }));
          });
        });
      }

      // delete post button
      for (var d = 0; d < deleteButtons.length; d++) {
        deleteButtons[d].onclick = function () {
          var postId = this.getAttribute("data-postid");

          var delReq = new XMLHttpRequest();
          delReq.open("DELETE", "http://localhost:3000/posts/" + postId, true);
          delReq.onload = function () {
            if (delReq.status === 200) {
              fetchPosts();
            }
          };
          delReq.send();
        };
      }
    }
  };

  req.send();
}
