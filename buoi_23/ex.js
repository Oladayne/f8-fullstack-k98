const tabLogin = document.querySelector(".login");
const tabRegister = document.querySelector(".register");
const nameRegister = document.getElementById("name");
const emailRegister = document.getElementById("email-register");
const passRegister = document.getElementById("password-register");
const input = document.getElementById("email");
const inputId = document.getElementById("password");
const ListInputLogin= document.getElementsByClassName("input-login");
const ListInputRegister = document.getElementsByClassName("input-register");
const noticeLogin = document.querySelectorAll(".notice-login");
const noticeRegister = document.querySelectorAll(".notice-register");

function clearFields(...fields) {
  fields.forEach(field => {
    field.value = "";
  });
}
function clearNotices(notices) {
  notices.forEach(notice => {
    notice.textContent = "";
  });
}
function resetTabStyles(...form) {
  form.forEach(forms => {
    forms.style= "border:.6px solid grey;";
  });

}

tabLogin.addEventListener('click', () => {
  document.getElementById("loginform").style.display = "block";
  document.getElementById("registerform").style.display = "none";
  tabRegister.style="background-color: rgb(193, 193, 193);";
  tabLogin.style="background-color: aliceblue;";
  clearFields(nameRegister, emailRegister, passRegister);
  clearNotices(noticeLogin);
  resetTabStyles(input, inputId);
  document.querySelector(".notice-login-fail").style="color:red;display: none;";
  
});

tabRegister.addEventListener('click', () => {
  document.getElementById("loginform").style.display = "none";
  document.getElementById("registerform").style.display = "block";
  clearFields(input, inputId);
  clearNotices(noticeRegister);
  resetTabStyles(nameRegister, emailRegister, passRegister);
  tabLogin.style="background-color: rgb(193, 193, 193);"
  tabRegister.style="background-color: aliceblue;"
  
});


function checkInputBlur (arrInput, arrnotice) {
  for (let i = 0; i < arrInput.length; i++) {
    if (arrInput[i].value === "") {
      arrnotice[i].textContent = "Vui lòng nhập thông tin";
      arrInput[i].style="border: 1px solid red;"

    } else {
      arrnotice[i].textContent = "";
      arrInput[i].style="border:.6px solid grey;"
    }
  }
}

var notication = function(arr,arrNotice){
  for(let i=0;i<arr.length;i++){
    arr[i].onblur =function(){
      checkInputBlur(arr,arrNotice);
    }
}
}
notication(ListInputLogin, noticeLogin);
notication(ListInputRegister,noticeRegister );
const btnLogin=document.querySelector(".btn-login");
const btnRegister=document.querySelector(".btn-register");
btnLogin.type = "button";
btnRegister.type = "button";
btnLogin.addEventListener('click', () => {
   document.querySelector(".notice-login-fail").style="color:red;display: block;";
   checkInputBlur(ListInputLogin, noticeLogin);
});
btnRegister.addEventListener('click', () => {
   document.querySelector(".notice-login-fail").style="color:red;display: block;";
   checkInputBlur(ListInputRegister,noticeRegister );
});
document.querySelector(".login-tab").addEventListener('click', () => {
  document.getElementById("overlay").style.display="block"
});
document.querySelector(".overlay").addEventListener('click', () => {
  document.getElementById("overlay").style.display="none"
});
document.addEventListener("DOMContentLoaded", function() {
    var passwordInput = document.getElementById("password");
    var toggleButton = document.getElementById("tb");
    toggleButton.addEventListener("click", togglePasswordVisibility);
    var passwordVisible = false;
    function togglePasswordVisibility() {
      passwordVisible = !passwordVisible;
      if (passwordVisible) {
        passwordInput.type = "text"; 
        toggleButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
      } else {
        passwordInput.type = "password";
        toggleButton.innerHTML ='<i class="fa-solid fa-eye"></i>';
      }
    }
});
  
  