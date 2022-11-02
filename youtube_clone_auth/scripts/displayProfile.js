let loggedUser = JSON.parse(sessionStorage.getItem("current_user"));
console.log(loggedUser);
if (loggedUser != null) {
  let login_div = document.getElementById("login_section");
  login_div.innerHTML = "";
  login_div.style.border = "none";
  login_div.style.backgroundColor = "rgba(32, 32, 32, 0.97)";
  login_div.style.color = "white";

  login_div.innerHTML = `<div id="profile_div">
        <p>${loggedUser.name}</p>
        <div id="dropdown">
        <p>${loggedUser.username}</p>
        <p id="sign_out">Sign out</p>
        </div>
    </div>`;

  let profile_div = document.getElementById("profile_div");
  profile_div.addEventListener("click", () => {
    if (document.getElementById("dropdown").style.display == "none") {
      document.getElementById("dropdown").style.display = "block";
    } else {
      document.getElementById("dropdown").style.display = "none";
    }
  });

  let sign_out = document.getElementById("sign_out");
  console.log(sign_out);
  sign_out.addEventListener("click", () => {
    sessionStorage.removeItem("current_user");
    window.location.reload();
  });
}
