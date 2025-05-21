  const newpost_input = document.querySelector(".newposts");
  const postPopup = document.getElementById("postPopup");
  const closePopup = document.getElementById("closePopup");

  newpost_input.addEventListener("click", () => {
    postPopup.style.display = "flex";
  });

  closePopup.addEventListener("click", () => {
    postPopup.style.display = "none";
  });

  //close when user click in anywhere in screen 
  window.addEventListener("click", (e) => {
    if (e.target === postPopup) {
      postPopup.style.display = "none";
    }
  });
