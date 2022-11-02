import Navbar from "./components/Navbar.js";

// API key
let key = "AIzaSyAnSKsYtXlZMK9ZQ_6GZQ9oG0cvZoAOSYM";

let navbar = document.getElementById("navbar");
navbar.innerHTML = Navbar();

document.getElementById("logo").addEventListener("click", function () {
  location.href = "index.html";
});

let getData = async () => {
  try {
    let text = document.getElementById("search_bar").value;

    let response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&maxResults=20&q=${text}&key=${key}`
    );
    let data = await response.json();
    let actual_data = data.items;
    appendVideos(actual_data);
  } catch (err) {
    console.log("error :", err);
  }
};

let search_btn = document.getElementById("search_btn_div");
search_btn.addEventListener("click", getData);

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

function appendVideos(data) {
  document.getElementById("videos_container").innerHTML = "";
  data.forEach(({ snippet, id: { videoId } }) => {
    let div = document.createElement("div");

    let img = document.createElement("img");
    img.src = snippet.thumbnails.high.url;

    let title = document.createElement("p");
    title.innerText = snippet.title;

    let channel_title = document.createElement("p");
    channel_title.innerText = snippet.channelTitle;

    div.append(img, title, channel_title);
    document.getElementById("videos_container").append(div);

    div.onclick = () => {
      let data = {
        snippet,
        videoId,
      };
      localStorage.setItem("clickedVideo", JSON.stringify(data));
      location.href = "video.html";
    };
  });
}

// Popular Video function

const getPopularVideos = async () => {
  try {
    let response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=IN&key=${key}`
    );
    let data = await response.json();
    let actual_data = data.items;
    console.log(actual_data);
    appendPopularVideos(actual_data);
  } catch (err) {
    console.log(`Error : ${err}`);
  }
};

function appendPopularVideos(data) {
  document.getElementById("videos_container").innerHTML = "";
  data.forEach(({ snippet, id }) => {
    let div = document.createElement("div");

    let img = document.createElement("img");
    img.src = snippet.thumbnails.high.url;

    let title = document.createElement("p");
    title.innerText = snippet.title;

    let channel_title = document.createElement("p");
    channel_title.innerText = snippet.channelTitle;

    div.append(img, title, channel_title);
    document.getElementById("videos_container").append(div);

    div.onclick = () => {
      let data = {
        snippet,
        videoId: id,
      };
      localStorage.setItem("clickedVideo", JSON.stringify(data));
      location.href = "video.html";
    };
  });
}

window.onload = () => {
  if (sessionStorage.getItem("keyword") != null) {
    document.getElementById("search_bar").value =
      sessionStorage.getItem("keyword");
    getData();
    sessionStorage.removeItem("keyword");
  } else {
    getPopularVideos();
  }
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
