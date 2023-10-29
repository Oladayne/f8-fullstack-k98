import { client } from "./client.js";
import { config } from "./config.js";
const { SERVER_API_AUTH } = config;

client.setUrl(SERVER_API_AUTH);

const app = {
  root: document.querySelector("#root"),
  subLogin: document.querySelector(".sub-login"),
  subSignup: document.querySelector(".sub-signup"),
  isLogin: function () {
    const status = localStorage.getItem("login_token") ? true : false;

    return status;
  },
  render: function () {
    console.log("re-render");
    let html;

    if (this.isLogin()) {
      html = `
      
      <div class="container py-3">
        <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
        <ul class="profile list-unstyled d-flex gap-3">
          <li>Chào bạn: <spanspan class="profile-name" id="profile-name">Loading...</spanspan></li>
          <li><a href="#" class="text-decoration-none logout">Đăng xuất</a></li>
        </ul>
      </div>`;

      this.getProfile();
    } else {
      html = ` <div class="container">
        
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
              <button>Login</button>
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
      <div id="registration-status"></div>
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
      if (e.target.classList.contains("signup")) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;
        this.signUp({ email, password ,name});
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
    const msg = this.root.querySelector("#registration-status");
    msg.innerText = ``;
    msg.innerText = msgText;
  },
  login: async function (data) {
    this.loading();
    try {
      //Call API
      const { response, data: token } = await client.post("/auth/login", data);
      this.loading(false); //Xóa loading
      if (!response.ok) {
        throw new Error("Email hoặc mật khẩu không hợp lệ");
      }
      //Thêm token vào Storage (localStorage)
      const accessToken = token.data;
      localStorage.setItem("login_token", JSON.stringify(accessToken));
      
      
      //Render
      this.render();
    } catch (e) {
      this.showError(e.message);
    }
  },
  
  signUp: async function (data) {
    this.loading();
    try {
      const { response, data: userData }= await client.post("/auth/register", data);

        if (response.ok) {
            // Lấy token từ phản hồi API
            // Thay đổi dữ liệu trả về từ API nếu cần
            // Lưu token vào LocalStorage (hoặc nơi lưu trữ khác)
            
            // Xóa trạng thái loading
            this.loading(false);

            // Xoá giá trị trên các trường nhập
            nameEl.value = "";
            passwordEl.value = "";
            emailEl.value = "";

            // Hiển thị thông báo thành công cho người dùng
            document.getElementById('registration-status-signup').textContent = 'Đăng ký thành công';
            
            
        } else {
            // Xử lý trường hợp lỗi từ API
            this.showError('Đã có lỗi xảy ra khi đăng ký.');
        }

        // Gọi hàm render hoặc thực hiện các hành động khác sau khi đăng ký thành công
        this.render();
    } catch (e) {
        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình gọi API
        this.showError('Có lỗi xảy ra khi đăng ký: ' + e.message);
    }
   
},
refreshToken: async function (setNewToken = false, callback = () => {}) {
  try {
     let userData = localStorage.getItem("login_token");
     const refreshToken = JSON.parse(userData).refreshToken;
     const { res, data: newToken } = await client.post("/auth/refresh-token", {
        refreshToken: refreshToken,
     });

     if (!res.ok) {
        this.refreshToken(setNewToken, callback);
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
     this.logout();
  }
},
refreshAccessToken: async function () {
  try {
    const token = localStorage.getItem("login_token");
    if (token) {
      const refreshToken = JSON.parse(token).refreshToken;
      const { res, data: newToken } = await client.post("/auth/refresh-token", {
        refreshToken: refreshToken,
      });

      if (res.ok) {
        // Lưu mã thông báo mới vào localStorage
        localStorage.setItem("login_token", JSON.stringify(newToken.data.token));
      } else {
        // Xử lý trường hợp cập nhật thất bại
        console.log("Cập nhật mã thông báo thất bại.");
      }
    }
  } catch (error) {
    console.log("Lỗi cập nhật mã thông báo: " + error.message);
  }
},
  getProfile: async function () {
    try {
      const token = localStorage.getItem("login_token");
      console.log(token);
      if (token) {
        
        const accessToken = JSON.parse(token).accessToken;
        console.log(accessToken);
        // Đặt accessToken cho client
        client.setToken(accessToken);
  
        // Gửi yêu cầu để lấy thông tin cá nhân của tài khoản
        const { response, data: userData} = await client.get("/users/profile");
  
        if (response.ok) {
          const profileName = this.root.querySelector("#profile-name");
          if (profileName) {
            profileName.textContent =userData.data.name; // Lấy tên từ dữ liệu và hiển thị lên giao diện
            console.log(userData.data.name);
          }
        } else {
          this.refreshToken(false, this.getProfile);
            return;
        }
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  },

  makeAuthorizedRequest:async function () {
    const token = localStorage.getItem("login_token");
    if (token) {
      const accessToken = JSON.parse(token).accessToken;
      // Kiểm tra xem mã thông báo có còn hiệu lực hay không
      // Nếu còn hiệu lực, sử dụng nó cho yêu cầu
      // Nếu hết hạn, gọi hàm cập nhật mã thông báo và sau đó sử dụng mã thông báo mới
      const { response, data } = await client.get("/users/profile");
  
      if (!response.ok) {
        // Mã thông báo hết hạn, cần cập nhật mã thông báo
        this.refreshToken();
        // Sau khi cập nhật, bạn có thể gọi lại yêu cầu ban đầu hoặc thực hiện các hành động khác
      } else {
        // Xử lý dữ liệu từ yêu cầu thành công
        console.log("Dữ liệu từ yêu cầu thành công:", data);
      }
    } else {
      // Không có mã thông báo, xử lý một cách thích hợp
    }
  },
  
  // Sử dụng hàm makeAuthorizedRequest cho yêu cầu bất kỳ
  
  logout: function () {
    localStorage.removeItem("login_token");
    this.render();
  },
  start: function () {
    // Kiểm tra mã thông báo hợp lệ trong local storage
    const token = localStorage.getItem("login_token");
    if (token) {
      // Mã thông báo tồn tại, đặt nó cho client API của bạn
      const accessToken = JSON.parse(token).accessToken;
      client.setToken(accessToken);
      // Hiển thị nội dung của người dùng đã xác thực hoặc nội dung khác
      this.render();
    } else {
      // Không có mã thông báo hợp lệ, hiển thị biểu mẫu đăng nhập/đăng ký
      this.render();
    }
    this.makeAuthorizedRequest();
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
let inputPassword = document.getElementById('password');
let password = document.getElementById('password');
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
