class User {
  constructor() {}

  validateUsername(username) {
    return username.includes("@") ? false : true;
  }

  validatePwd(pwd) {
    return pwd.length >= 8;
  }

  async signUp(n, e, u, p, m, d) {
    let isValidated = this.validateUsername(u) && this.validatePwd(p);

    if (isValidated) {
      this.name = n;
      this.email = e;
      this.username = u;
      this.password = p;
      this.mobile = m;
      this.description = d;

      let register_api = "https://masai-api-mocker.herokuapp.com/auth/register";

      let response = await fetch(register_api, {
        method: "POST",
        body: JSON.stringify(this),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();
      alert(data.message);
    }
  }

  async signIn(u, p) {
    try {
      let userData = {
        password: p,
        username: u,
      };

      let login_api = "https://masai-api-mocker.herokuapp.com/auth/login";

      let response = await fetch(login_api, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();
      alert("Login Successfull");
      return data;
    } catch (err) {
      alert("Invaild User");
      console.log("err", err);
    }
  }
}

let user = new User();

// Register function

const Register = () => {
  let reg_form = document.getElementById("reg_form");

  let name = reg_form.name.value;
  let email = reg_form.email.value;
  let username = reg_form.username.value;
  let password = reg_form.password.value;
  let mobile = reg_form.mobile.value;
  let description = reg_form.description.value;

  user.signUp(name, email, username, password, mobile, description);
};

// Login function

const Login = async () => {
  let login_form = document.getElementById("login_form");

  let username = login_form.login_username.value;
  let password = login_form.login_password.value;

  let { token } = await user.signIn(username, password);
  getProfile(username, token);
};

// Profile function

const getProfile = async (username, token) => {
  let profile_api = `https://masai-api-mocker.herokuapp.com/user/${username}`;

  let response = await fetch(profile_api, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await response.json();
  sessionStorage.setItem("current_user", JSON.stringify(data));
  location.href = "index.html";
};

// Form

let login = document.getElementById("to_login");
let reg = document.getElementById("to_reg");

login.addEventListener("click", () => {
  document.getElementById("login_div").style.display = "block";
  document.getElementById("reg_div").style.display = "none";
});

reg.addEventListener("click", () => {
  document.getElementById("login_div").style.display = "none";
  document.getElementById("reg_div").style.display = "block";
});
