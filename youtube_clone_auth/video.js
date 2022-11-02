import Navbar from "./components/Navbar.js";

let navbar = document.getElementById("navbar");
navbar.innerHTML = Navbar();

let search_btn = document.getElementById("search_btn_div");
search_btn.addEventListener("click", function () {
  location.href = "index.html";
  sessionStorage.setItem(
    "keyword",
    document.getElementById("search_bar").value
  );
});

// Get the input field
var input = document.getElementById("search_bar");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    search_btn.click();
  }
});

let videoData = JSON.parse(localStorage.getItem("clickedVideo"));

document.getElementById("logo").addEventListener("click", function () {
  location.href = "index.html";
});

function videoAppend({ snippet, videoId }) {
  let iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
  iframe.setAttribute("allowFullscreen", true);

  document.getElementById("iframe_div").append(iframe);

  document.getElementById("title").innerText = snippet.title;
  document.getElementById("channel_name").innerText = snippet.channelTitle;
}

async function getSuggestions(id) {
  try {
    let key = "AIzaSyAnSKsYtXlZMK9ZQ_6GZQ9oG0cvZoAOSYM";
    let response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&relatedToVideoId=${id}&type=video&videoEmbeddable=true&key=${key}`
    );
    let data = await response.json();
    let actual_data = data.items;
    appendSuggestions(actual_data);
  } catch (err) {
    console.log("Error :", err);
  }
}

function appendSuggestions(data) {
  data.forEach((el) => {
    let main_div = document.createElement("div");

    let img_div = document.createElement("div");
    let img = document.createElement("img");
    img.src = el.snippet.thumbnails.high.url;
    img_div.append(img);

    let detail_div = document.createElement("div");
    let title = document.createElement("h4");
    title.classList.add("sug_title");
    title.innerText = el.snippet.title;
    let channel_name = document.createElement("p");
    channel_name.innerText = el.snippet.channelTitle;

    detail_div.append(title, channel_name);
    main_div.append(img_div, detail_div);

    document.getElementById("rhs").append(main_div);

    let videoId = el.id.videoId;
    let snippet = el.snippet;
    main_div.onclick = () => {
      let obj = {
        snippet,
        videoId,
      };
      localStorage.setItem("clickedVideo", JSON.stringify(obj));
      window.location.reload();
    };
  });
}

window.onload = () => {
  videoAppend(videoData);
  getSuggestions(videoData.videoId);
};

// Profile

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
