// check if user loged in or not
const loggedInUser = localStorage.getItem("loggedInUser");
if (loggedInUser) {
  window.location.href = "pages/home.html";
}



///////////////////////////////////////////////////

// main code to login & add data to server
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const req = new XMLHttpRequest();
  req.open("GET", "http://localhost:3000/users");
  req.onload = function () {
    if (req.status === 200) {
      const users = JSON.parse(req.responseText);

      
      // Find the user in the database whose email and password match the input
      const user = users.find(function (u) {
        return u.email === email && u.password === password;
      });

      // if i found him
      if (user) {
        console.log("login successful");

        // save login data at localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        //go to home page
        window.location.href = "pages/home.html";
      } 
      // if i not found him in database or server
      else {
        alert("Email or password is invalid");
      }
    } 
    //if server not response or error in network
    else {
      alert("error in server");
    }
  };

  req.send();
});
