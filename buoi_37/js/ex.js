import { client } from "./client.js";
import { config } from "./config.js";
const { SERVER_API_AUTH } = config;
moment.locale("vi");
client.setUrl(SERVER_API_AUTH);
let limit = 1;
const app = {
  root: document.querySelector("#root"),

  subLogin: document.querySelector(".sub-login"),
  subSignup: document.querySelector(".sub-signup"),
  showForm: document.querySelector(".sg-in"),
  modalEl: document.querySelector(".container-5"),
  isLogin: function () {
    let token = localStorage.getItem("login_token");
    let accessToken;

    if (token) {
      accessToken = JSON.parse(token).accessToken;
    }
    const status = accessToken ? true : false;
    if (!status) {
      localStorage.removeItem("login_token");
    }

    return status;
  },
  renderBlogs: function (blogs, position = `beforeend`) {
    let html;
    html = blogs
      .map(
        ({ title, content, timeUp, userId }) =>
          ` <div class="posts">
      <div class="user-profile-box">
        <div class="user-profile">
            <img src="https://i.pinimg.com/564x/68/4e/81/684e814ad4e496feab27302d9bec33d2.jpg" alt="">
            <div> 
                <p class="name-user"> <a href="">${userId.name}</a></p>
                <small class="time-post">${timeUp}</small>
            </div>
        </div>
        <div>
            <a href="#"><i class="fas fa-ellipsis-v"></i></a>
        </div>
    </div>
    <div class="status-post">
        <p class="title-post-content">${title}</p>
        <p class="contenr-post">${content} </p>
        <img class="image-post" src="" alt="">
        <span>${moment(timeUp).fromNow()}</span>
    </div>
    
    </div>`
      )
      .join("");
    const divBlogs = document.querySelector(".window-scroll");
    divBlogs.insertAdjacentHTML(position, html);
    this.isLoader = false;
  },
  render: function () {
    let html;

    if (this.isLogin()) {
      html = `
      
      <div class="container py-3"  style="    width: 800px;">
        <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
        <ul class="profile list-unstyled d-flex gap-3">
          <li><span class="profile-name" id="profile-name">Loading...</span></li>
          <li><a href="#" class="text-decoration-none logout">Đăng xuất</a></li>
        </ul>
        <div class="containation">
        <form action="" class="write-post">
        <h2 class="">Viết bài</h2>
          <div class="mb-3 title-3">
            <label for="">Enter your title</label>
            <input type="text" name="title" class="form-control title-write" placeholder="Title..." required/>
          </div>
          <div class="mb-3 content-3">
            <label for="">Enter your content</label>
            <textarea class="form-control content-write"placeholder="Content..." required></textarea>
          </div>
          <div class="mb-3 date-3">
            <label for="">Set time to post</label>
            <input type="date" id="datePicker" class="form-control date">
          </div>
          <div class="mb-3 button-3">
            <button class="btnContent btn-primary" id="checkButton">Write new</button>
          </div>
        </form>
      </div>
      </div>`;

      this.getProfile();
    } else {
      html = `
      <button class="sg-in"> Đăng nhập</button>
      <div class="container form-lg">
     
      <div class="form loginn " id="form">
          <form class="content sub-login login">
          <p id="registration-status"></p>
              <h1>Login</h1>
              <div class="group">
                  <input type="email" id="username-login" name="email" class="form-control email inputText" placeholder="" required/>
                  <label for="username-login">Email</label>   
              </div>
              <div class="group forpass">
                  <input type="password" name="password" id="pass-login" class="form-control password inputText" placeholder="" required/>
                  <label for="pass-login">Password</label>
                  <span id="showPasswordLogin">
                      <ion-icon name="eye-outline"></ion-icon>
                      <ion-icon name="eye-off-outline"></ion-icon>
                  </span>
              </div>
              <div class="group">
                  <input type="checkbox"> Save login
              </div>
              <button id="btnLogin">Login</button>
          </form>


          <form class="content sub-signup signup">
              <h1>Register</h1>
              <p id="registration-status-signup"></p>
              <div class="group">
                  <input type="text" id="name" class="inputText" placeholder=" " required>
                  <label for="username-reg">Username</label>
              </div>
              <div class="group">
                  <input type="email" id="email" class="inputText" placeholder=" " required>
                  <label for="email-reg">Email</label>
              </div>
              <div class="group forpass">
                  <input type="password" id="password" placeholder=" " required class="inputText">
                  <label for="pass-reg">Password</label>
                  <span id="showPassword">
                      <ion-icon name="eye-outline"></ion-icon>
                      <ion-icon name="eye-off-outline"></ion-icon>
                  </span>
                  <div class="power-container">
                      <div id="power-point"></div>
                  </div>
                  <div class="checkPass">
                      <label for="">
                          <div  class="checkmini">
                              <input type="checkbox" class="check-item" id="checkbox1">
                              <p> kèm kí hiệu số</p>
                          </div>
                          <div  class="checkmini">
                              <input type="checkbox" class="check-item" id="checkbox2">
                              <p> kèm chữ in thường</p>
                          </div >
                          <div  class="checkmini">
                              <input type="checkbox" class="check-item" id="checkbox3">
                              <p>kèm chữ in hoa</p>
                          </div>
                          <div  class="checkmini">
                              <input type="checkbox" class="check-item" id="checkbox4">
                              <p>kèm kí tự đặc biệt</p>
                          </div>
                          <div  class="checkmini">
                              <input type="checkbox" class="check-item" id="checkbox5">
                              <p>tối thiểu 6 kí tự</p>
                          </div>
                      </label>
                  </div>
              </div>
              <button class="btn ">Sign Up</button>
          </form>


          <div class="form-rotate">
              <div id="rotate"></div>
          </div>
      </div>
      <div class="option">
          <div class="bg-active" id="bg-active"></div>
          <div class="changeType active" id="login">Login</div>
          <div class="changeType" id="register">Register</div>
      </div>
  </div>
  `;
      setTimeout(() => {
        this.eventLy();
      }, 0);
    }
    const Lg = document.querySelector(".login-signup");
    Lg.innerHTML = html;
  },
  loadingBtn: function (status = true, btn, contentBtn = `Đăng nhập`) {
    const button = btn || this.root.querySelector("#btnLogin");
    if (status) {
      button.innerHTML = `<i class="fa fa-spinner fa-spin"></i><span>Loading...</span>`;
      button.disabled = true;
    } else {
      button.innerHTML = contentBtn;
      button.disabled = false;
    }
  },
  addEvent: function () {
    this.root.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("login")) {
        const emailEl = e.target.querySelector(".email");
        const passwordEl = e.target.querySelector(".password");
        const email = emailEl.value;
        const password = passwordEl.value;
        this.login({ email, password });
      }
      if (e.target.classList.contains("signup")) {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const name = document.getElementById("name").value;
        this.signUp({ email, password, name });
      }
    });
    this.root.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("write-post")) {
        const titleEl = document.querySelector(".title-write");
        const contentEl = document.querySelector(".content-write");
        const title = titleEl.value;
        const content = contentEl.value;
        this.PostContent({ title, content });
      }
    });

    this.root.addEventListener("click", (e) => {
      if (e.target.classList.contains("logout")) {
        e.preventDefault();
        this.logout();
      }
      if (e.target.classList.contains(".sg-in")) {
        e.preventDefault();
        document.querySelector(".loginn").style.display = "block";
        document.querySelector(".option").style.display = "block";
        document.querySelector(".sg-in").style.display = "none";
      }
    });
    // this.root.addEventListener("click", (e) => {
    //   e.target.classList.contains("posts");
    //   e.preventDefault();
    // });
  },
  PostContent: async function (data) {
    console.log(data);
    const writeNew = document.querySelector(".btnContent");
    this.loadingBtn(true, writeNew);
    try {
      const { response, data: userData } = await client.post("/blogs", data);
      this.renderBlogs([userData.data], `afterbegin`);
      if (response.ok) {
        this.loadingBtn(false, writeNew);
      } else {
        this.showError("lỗi gửi đi");
      }
      this.render();
    } catch (e) {
      this.showError("Có lỗi xảy ra khi đăng ký: " + e.message);
    }
    const datePicker = flatpickr("#datePicker", {
      enableTime: true, // Cho phép chọn cả thời gian
      dateFormat: "Y-m-d H:i", // Định dạng thời gian
     
  });

  const checkButton = document.getElementById("checkButton");

  checkButton.addEventListener("click", function() {
      const selectedDate = new Date(datePicker.selectedDates[0]);
      const currentDate = new Date();
    if (selectedDate.getTime() !== currentDate.getTime()) {
        
          alert("Thời gian đã chọn khác với thời gian hiện tại.");
          // Làm mới trường input
          datePicker.clear();
      }
  });
  },
  showError: function (msgText) {
    const element = document.getElementById("registration-status");

    if (element !== null) {
      element.innerText = ``;
      element.innerText = msgText;
    } else {
      console.log("đã được gửi đi");
    }
  },
  login: async function (data) {
    this.loadingBtn();
    try {
      const { response, data: token } = await client.post("/auth/login", data);
      this.loadingBtn(false);
      if (!response.ok) {
        throw new Error("Email hoặc mật khẩu không hợp lệ");
      }
      const accessToken = token.data;
      localStorage.setItem("login_token", JSON.stringify(accessToken));
      this.render();
    } catch (e) {
      this.showError(e.message);
    }
  },
  eventLy: function () {
    let options = document.querySelectorAll(".changeType");
    let form = document.getElementById("form");
    let bgActive = document.getElementById("bg-active");
    var rotateDeg = 0;
    let showPasswordLogin = document.getElementById("showPasswordLogin");
    let inputPasswordLogin = document.getElementById("pass-login");
    let showPassword = document.getElementById("showPassword");
    let inputPassword = document.getElementById("password");
    let password = document.getElementById("password");
    let power = document.getElementById("power-point");
    let checkboxes = document.querySelectorAll(".check-item");

    showPasswordLogin.onclick = function () {
      console.log("ngon1");
      if (inputPasswordLogin.type == "password") {
        inputPasswordLogin.type = "text";
        showPasswordLogin.classList.add("show");
      } else {
        inputPasswordLogin.type = "password";
        showPasswordLogin.classList.remove("show");
      }
    };
    showPassword.onclick = function () {
      console.log("ngon2");
      if (inputPassword.type == "password") {
        inputPassword.type = "text";
        showPassword.classList.add("show");
      } else {
        inputPassword.type = "password";
        showPassword.classList.remove("show");
      }
    };
    document.querySelector(".sg-in").addEventListener("click", function () {
      document.querySelector(".loginn").style.display = "block";
      document.querySelector(".option").style.display = "block";
      document.querySelector(".sg-in").style.display = "none";
    });
    options.forEach((val) => {
      val.addEventListener("click", function (event) {
        if (this.classList.contains("active")) {
          return;
        }
        form.classList.remove("login");
        form.classList.remove("register");
        form.classList.add(this.id);
        bgActive.style.left = this.offsetLeft + "px";
        options.forEach((item) => {
          item.classList.remove("active");
        });
        this.classList.remove("active");
        rotateDeg = rotateDeg + 200;
        document.getElementById("rotate").style.transform =
          "translate(-50%) rotate(" + rotateDeg + "deg)";
      });
    });

    document.addEventListener("DOMContentLoaded", function () {
      let checkboxes = document.querySelectorAll(".check-item");

      checkboxes.forEach((checkbox) => {
        checkbox.disabled = true;
      });
    });
    password.oninput = function () {
      let point = 0;
      let value = password.value;
      checkboxes.forEach((checkbox, index) => {
        let condition = false;

        // Kiểm tra điều kiện dựa trên index của ô kiểm
        switch (index) {
          case 0: // Ô kiểm thứ nhất - kèm kí hiệu thường
            condition = /[0-9]/.test(value);
            break;
          case 1: // Ô kiểm thứ hai - kèm kí hiệu in hoa
            condition = /[a-z]/.test(value);
            break;
          case 2: // Ô kiểm thứ ba - kèm kí tự đặc biệt
            condition = /[A-Z]/.test(value);
            break;
          case 3: // Ô kiểm thứ tư - kèm kí tự số
            condition = /[^0-9a-zA-Z]/.test(value);
            break;
          case 4:
            condition = value.length >= 6;
            break;
          default:
            break;
        }

        // Cập nhật trạng thái của ô kiểm dựa trên điều kiện
        checkbox.disabled = true;

        // Cập nhật trạng thái của ô kiểm dựa trên điều kiện
        checkbox.checked = condition;
      });
      let widthPower = ["1%", "16.6%", "33.3%", "49.9%", "66.6%", "100%"];
      let colorPower = [
        "#D73F40",
        "#DC6551",
        "#F2B84F",
        "#BDE952",
        "#30CEC7",
        "#00d600",
      ];

      if (value.length >= 1) {
        let arrayTest = [/[0-9]/, /[a-z]/, /[A-Z]/, /[^0-9a-zA-Z]/];
        arrayTest.forEach((item) => {
          if (item.test(value)) {
            point += 1;
          }
        });
      }
      if (value.length >= 6) {
        point += 1;
      }
      power.style.width = widthPower[point];
      power.style.backgroundColor = colorPower[point];
    };
  },
  signUp: async function (data) {
    this.loadingBtn();
    try {
      const { response, data: userData } = await client.post(
        "/auth/register",
        data
      );

      if (response.ok) {
        this.loadingBtn(false);
        const { name: nameEl, email: emailEl, password: passwordEl } = data;
        nameEl.value = "";
        passwordEl.value = "";
        emailEl.value = "";
        document.getElementById("registration-status-signup").textContent =
          "Đăng ký thành công";
      } else {
        this.showError("Đã có lỗi xảy ra khi đăng ký.");
      }
      this.render();
    } catch (e) {
      this.showError("Có lỗi xảy ra khi đăng ký: " + e.message);
    }
  },
  refreshToken: async function (setNewToken = false, callback = () => {}) {
    try {
      let userData = localStorage.getItem("login_token");
      const refreshToken = JSON.parse(userData).refreshToken;
      const { response, data: newToken } = await client.post(
        "/auth/refresh-token",
        {
          refreshToken: refreshToken,
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi");
      }

      const jsonToken = JSON.stringify(newToken.data.token);

      localStorage.setItem("login_token", jsonToken);
      callback();

      if (setNewToken) {
        const accessToken = newToken.data.token.accessToken;
        client.setToken(accessToken);
      }
    } catch (error) {
      console.log(error.message);
      return response;
    }
  },
  getProfile: async function () {
    try {
      const token = localStorage.getItem("login_token");
      console.log(token);
      if (token) {
        const accessToken = JSON.parse(token).accessToken;
        console.log(accessToken);
        client.setToken(accessToken);
        const { response, data: userData } = await client.get("/users/profile");
        if (response.ok) {
          const profileName = this.root.querySelector("#profile-name");
          if (profileName) {
            profileName.textContent = userData.data.name;
            console.log(userData.data.name);
          }
        } else {
          const success = this.refreshToken(false, this.getProfile);
          if (!success.ok) {
            throw new Error(" lỗi này ");
          }
        }
      }
    } catch (error) {
      console.error("Lỗi:", error.message);
      this.logout();
    }
  },
  fetchData: async function () {
    const { data: blogs } = await client.get(`/blogs?page=${limit}`);
    this.renderBlogs(blogs.data);
  },
  makeAuthorizedRequest: async function () {
    const token = localStorage.getItem("login_token");
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      const { response, data } = await client.get("/users/profile");

      if (!response.ok) {
        this.refreshToken();
      } else {
        console.log("Dữ liệu từ yêu cầu thành công:", data);
      }
    } else {
    }
  },
  logout: function () {
    const { response, data: token } = client.post("/auth/logout");
    localStorage.removeItem("login_token");
    this.render();
  },
  makeDiv: function () {
    const divLogin = document.createElement("div");
    divLogin.classList.add("login-signup");

    const divBlog = document.createElement("div");
    divBlog.classList.add("window-scroll");

    this.root.append(divLogin);
    this.root.append(divBlog);
  },
  isLoader: false,
  handleScrollLoad: function () {
    const elementDiv = document.querySelector(".window-scroll");
    const eventScrollLoad = (e) => {
      const maxScrollValue = elementDiv.scrollHeight - elementDiv.clientHeight;
      const currentScrollValue = elementDiv.scrollTop;

      const y = (currentScrollValue / maxScrollValue) * 100;
      if (y >= 80 && !this.isLoader) {
        this.isLoader = true;
        limit++;
        this.fetchData();
      }
    };

    elementDiv.addEventListener("scroll", eventScrollLoad);
  },
  handleShowDetail: function () {
    let postId = null;
    const rootEl = document.querySelector(".window-scroll");
    rootEl.addEventListener("click", (e) => {
      const postItem = e.target.closest(".posts");

      if (postItem) {
        const title = postItem.querySelector(".title-post-content");
        const content = postItem.querySelector(".contenr-post");
        if (title && content) {
          this.modalEl.classList.remove("hide");

          const titleModal = this.modalEl.querySelector(".title-5");
          const bodyModal = this.modalEl.querySelector(".Vb");
          titleModal.innerHTML = title.innerHTML;
          bodyModal.innerHTML = content.innerHTML;
        }
      }
    });
  },
  handleCloseModal: function () {
    const closeBtn = document.querySelector(".close")
    closeBtn.addEventListener("click", () => {
      this.modalEl.classList.add("hide");
      const titleModal = this.modalEl.querySelector(".title-5");
      const bodyModal = this.modalEl.querySelector(".Vb");
      titleModal.innerHTML = "";
      bodyModal.innerHTML = "";
    });
  },
  getPostDetail: async function (id) {
    const { data: post, response } = await client.get(`/:blogId/${id}`);
    const titleEl = this.modalEl.querySelector(".modal-title");
    const bodyEl = this.modalEl.querySelector(".modal-body");
    if (response.ok) {
      const { title, content } = post;
      titleEl.innerHTML = title;
      bodyEl.innerHTML = content;
    } else {
      titleEl.innerHTML = `404 NOT FOUND`;
      bodyEl.innerHTML = `không tìm thấy bài`;
    }
  },
  start: async function () {
    this.makeDiv();
    const token = localStorage.getItem("login_token");
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      client.setToken(accessToken);
      this.render();
    } else {
      this.render();
    }
    this.makeAuthorizedRequest();
    this.addEvent();
    this.getProfile();
    await this.fetchData();
    this.handleScrollLoad();
    this.handleShowDetail();
    this.handleCloseModal();
  },
};

app.start();
