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
  req.open("POST", "https://stream-surf-airport.glitch.me/posts", true);
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
  req.open("GET", "https://stream-surf-airport.glitch.me/posts", true);

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
console.log(post);
console.log(loggedInUser);


        postElement.innerHTML = `
        <div class= "container">
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
      ${
        post.author == JSON.parse(loggedInUser).username
          ? `   <button class="edit-btn" data-postid="${post.id}"> Edit</button>
        <button class="delete-btn" data-postid="${post.id}"> Delete</button>`
          : ""
      }
      </div>
    <div class="comments-container">
      ${commentsHTML}
    </div>
    <div class="add-comment" style="display:none;">
      <input type="text" class="comment-input" placeholder="Write a comment..." />
      <button class="submit-comment-btn" data-postid="${post.id}">Add</button>
    </div>
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
          getReq.open(
            "GET",
            "https://stream-surf-airport.glitch.me/posts/" + postId,
            true
          );
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
                "https://stream-surf-airport.glitch.me/posts/" + postId,
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
            xhr.open(
              "PATCH",
              "https://stream-surf-airport.glitch.me/posts/" + postId
            );
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
          delReq.open(
            "DELETE",
            "https://stream-surf-airport.glitch.me/posts/" + postId,
            true
          );
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

////////////////////////////////////////chatpot/////////////////////////////////
async function sendMessage() {
  const input = document.getElementById("chat-input");
  const userMessage = input.value.trim();
  if (userMessage === "") return;

  addMessage(userMessage, "user");
  input.value = "";

  const botReply = await generateResponse(userMessage);
  addMessage(botReply, "bot");
}

function addMessage(text, sender) {
  const messagesContainer = document.getElementById("chat-messages");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = text;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

const GEMINI_API_KEY = "AIzaSyB2ol-eG12J72-MPMx1QKTB5i7xISQFGXI";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
const chatHistory = [];

async function generateResponse(userMessage) {
  chatHistory.push({
    role: "user",
    parts: [{ text: userMessage }],
  });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //we send this data as object becouse gemini need the full history
      body: JSON.stringify({ contents: chatHistory }),
    });

    if (!response.ok)
      throw new Error("Network response was not ok " + response.statusText);

    const data = await response.json();

    //extract the text correct from response
    // First: Check if there are any candidates in the response
    if (data.candidates && data.candidates.length > 0) {
      // Get the first candidate
      const firstCandidate = data.candidates[0];

      // Check if the content and parts exist
      if (
        firstCandidate.content &&firstCandidate.content.parts &&firstCandidate.content.parts.length > 0) {
        // Get the text from the first part
        let text = firstCandidate.content.parts[0].text;

        // Clean the text by removing backslash and asterisk characters if any
        text = text.replace(/\\([^]+)\\*/g, "$1");

        // Return the cleaned text
        return text;
      }
    }

    // If no candidates or content found, return a default message
    return "No response";

    chatHistory.push({
      role: "model",
      parts: [{ text: geminiReply }],
    });

    return geminiReply;
  } catch (error) {
    console.error(error);
    return "error try again ";
  }
}

//open and close it
function toggleChat() {
  const chatBox = document.getElementById("chat-box");
  const toggleButton = document.getElementById("chat-toggle");

  if (chatBox.style.display === "none" || chatBox.style.display === "") {
    // Show chat and hide toggle button
    chatBox.style.display = "flex";
    toggleButton.style.display = "none";
  } else {
    // Hide chat and show toggle button
    chatBox.style.display = "none";
    toggleButton.style.display = "flex";
  }
}

// hide chat by default on page load
window.onload = function () {
  document.getElementById("chat-box").style.display = "none";
};
