var form = document.querySelector(".form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = fname + " " + lname;

  // run the function
  signUp(username, email, password);
});



function signUp(username, email, password) {
  // XMLHttpRequest
  const req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/users");
  req.setRequestHeader("Content-Type", "application/json");

  
  req.onload = function () {

    //201 mean acount created 
    if (req.status === 201) {
      alert("account created");
      //get back the user to login page
      window.location.href = "../index.html"; 
    }
  };

  // أرسل البيانات
  const data = JSON.stringify({ username, email, password });
  req.send(data);
}
