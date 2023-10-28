import { client } from "./client.js";
import { config } from "./config.js";
const { SERVER_API_AUTH } = config;

client.setUrl(SERVER_API_AUTH);

const app = {
  root: document.querySelector("#root"),
  content: document.querySelector(".content"),
  isLogin: function () {
    const status = localStorage.getItem("login_token") ? true : false;

    return status;
  },
  render: function () {
    console.log("re-render");
    let html;

    if (this.isLogin()) {
      html = `<div class="container py-3">
        <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
        <ul class="profile list-unstyled d-flex gap-3">
          <li>Chào bạn: <span class="name">Loading...</span></li>
          <li><a href="#" class="text-decoration-none logout">Đăng xuất</a></li>
        </ul>
      </div>`;

      this.getProfile();
    } else {
      html = ` <div class="container">
        
      <div class="form loginn " id="form">
          <form class="content login">
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
              <button>Login</button>
          </form>


          <form class="content">
              <h1>Register</h1>
              <div class="group">
                  <input type="text" id="username-reg" class="inputText" placeholder=" " required>
                  <label for="username-reg">Username</label>
              </div>
              <div class="group">
                  <input type="email" id="email-reg" class="inputText" placeholder=" " required>
                  <label for="email-reg">Email</label>
              </div>
              <div class="group forpass">
                  <input type="password" id="pass-reg" placeholder=" " required class="inputText">
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
  </div>`;
    }

    this.root.innerHTML = html;
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
    });
    this.root.addEventListener("click", (e) => {
      if (e.target.classList.contains("logout")) {
        e.preventDefault();
        this.logout();
      }
    });
  },
  loading: function (status = true) {
    const button = this.root.querySelector(".btn");
    if (status) {
      button.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading...`;
      button.disabled = true;
    } else {
      button.innerHTML = `Đăng nhập`;
      button.disabled = false;
    }
  },
  showError: function (msgText) {
    const msg = this.root.querySelector(".loginn .msg");
    msg.innerText = ``;
    msg.innerText = msgText;
  },
  login: async function (data) {
    this.loading(); //Thêm loading
    try {
      //Call API
      const { response, data: token } = await client.post("/auth/login", data);
      this.loading(false); //Xóa loading
      if (!response.ok) {
        throw new Error("Email hoặc mật khẩu không hợp lệ");
      }
      //Thêm token vào Storage (localStorage)
      localStorage.setItem("login_token", JSON.stringify(token));
      //Render
      this.render();
    } catch (e) {
      this.showError(e.message);
    }
  },
  getProfile: async function () {
    try {
      let token = localStorage.getItem("login_token");
      let accessToken;

      if (token) {
        accessToken = JSON.parse(token).access_token;
      }

      if (!accessToken) {
        throw new Error("accessToken not null");
      }

      client.setToken(accessToken);
      const { response, data: user } = await client.get("/auth/profile");

      if (!response.ok) {
        throw new Error("Unauthorize");
      }

      const profileEl = this.root.querySelector(".profile");
      const profileName = profileEl.querySelector(".name");
      profileName.innerText = user.name;
    } catch (e) {
      if (e.message) {
        this.logout();
      }
    }
  },
  logout: function () {
    localStorage.removeItem("login_token");
    this.render();
  },
  start: function () {
    //Khởi động ứng dụng
    this.render();
    this.addEvent();
    this.getProfile();
  },
};

app.start();

/*
request -> accessToken chưa hết hạn -> ok
request -> accessToken hết hạn -> failed
Giải pháp: 
- request lấy lại accessToken (Dựa vào refresh)
- Lưu accessToken mới vào storage
- Gọi lại request bị failed
*/

//Promise, Async Await, Closure
//interceptors



let options = document.querySelectorAll('.changeType');
let form = document.getElementById('form');
let bgActive = document.getElementById('bg-active');
var rotateDeg = 0;
let showPasswordLogin = document.getElementById('showPasswordLogin');
let inputPasswordLogin = document.getElementById('pass-login');
let showPassword = document.getElementById('showPassword');
let inputPassword = document.getElementById('pass-reg');
let password = document.getElementById('pass-reg');
let power = document.getElementById('power-point');
let checkboxes = document.querySelectorAll('.check-item');
showPasswordLogin.onclick = function () {
    console.log("ngon1");
    if (inputPasswordLogin.type == 'password') {
        inputPasswordLogin.type = 'text';
        showPasswordLogin.classList.add('show');
    }else{
        inputPasswordLogin.type = 'password';
        showPasswordLogin.classList.remove('show');
    }
}
showPassword.onclick = function () {
    console.log("ngon2");
    if (inputPassword.type == 'password') {
        inputPassword.type = 'text';
        showPassword.classList.add('show');
    }else{
        inputPassword.type = 'password';
        showPassword.classList.remove('show');
    }
}

options.forEach(val => {
    val.addEventListener('click', function (event) {
        if (this.classList.contains('active')) {
            return
        }
        form.classList.remove('login');
        form.classList.remove('register');
        form.classList.add(this.id)
        bgActive.style.left = this.offsetLeft + 'px';
        options.forEach(item => {
            item.classList.remove('active');
        });
        this.classList.remove('active');
        rotateDeg = rotateDeg + 200;
        document.getElementById('rotate').style.transform='translate(-50%) rotate('+rotateDeg+'deg)'
    });
});
document.addEventListener('DOMContentLoaded', function () {
    let checkboxes = document.querySelectorAll('.check-item');

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
    let widthPower = ['1%','16.6%','33.3%','49.9%','66.6%','100%'];
    let colorPower = ['#D73F40', '#DC6551', '#F2B84F', '#BDE952', '#30CEC7','#00d600'];
    
    if (value.length >= 1) {
        let arrayTest = [
            /[0-9]/,
            /[a-z]/,
            /[A-Z]/,
            /[^0-9a-zA-Z]/,
        ];
        arrayTest.forEach(item => {
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
}
