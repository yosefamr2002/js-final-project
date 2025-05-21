loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const req = new XMLHttpRequest();
  req.open("GET", "http://localhost:3000/users");
  req.onload = function () {
    if (req.status === 200) {
      const users = JSON.parse(req.responseText);

      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        console.log("login successful");
        
        // يحول المستخدم للصفحة الرئيسية
        window.location.href = "pages/home.html"; 
      } else {
        alert("Email or passord is invalid");
      }
    } else {
      alert("error in server");
    }
  };

  req.onerror = function () {
    alert("error in server");
  };

  req.send();
});
