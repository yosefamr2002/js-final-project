var form = document.querySelector(".form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = fname + " " + lname;

  // استدعاء الفانكشن
  signUp(username, email, password);
});



function signUp(username, email, password) {
  // أبدأ طلب جديد باستخدام XMLHttpRequest
  const req = new XMLHttpRequest();
  req.open("POST", "http://localhost:3000/users");
  req.setRequestHeader("Content-Type", "application/json");

  // لما السيرفر يرد
  req.onload = function () {
    if (req.status === 201) {
      alert("تم إنشاء الحساب بنجاح!");
      window.location.href = "../index.html"; // رجّع المستخدم لصفحة الدخول
    }
  };

  // أرسل البيانات
  const data = JSON.stringify({ username, email, password });
  req.send(data);
}
