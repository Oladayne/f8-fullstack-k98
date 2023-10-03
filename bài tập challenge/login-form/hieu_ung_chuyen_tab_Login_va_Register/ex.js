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
