const Navbar = () => {
  return `<div id="logo_section">
    <div id="logo">
      <img src="logo.png" alt="" />
    </div>
  </div>

  <div id="search_section">
    <div id="search_bar_div">
      <input type="text" placeholder="Search" id="search_bar" />
    </div>
    <div id="search_btn_div">
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
    <div id="mic_btn_div">
      <i class="fa-solid fa-microphone"></i>
    </div>
  </div>

  <div id="login_section">
    <div id="login">
      <a href="account.html"><i class="fa-regular fa-user"></i> SIGN IN</a>
    </div>
  </div>`;
};

export default Navbar;
