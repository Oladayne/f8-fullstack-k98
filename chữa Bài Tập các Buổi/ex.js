// Lấy tham chiếu đến trường nhập mật khẩu, trường text, và nút toggle
var passwordInput = document.getElementById("passwordInput");
var textInput = document.getElementById("textInput");
var toggleButton = document.getElementById("toggleButton");

// Đăng ký sự kiện click cho nút toggle
toggleButton.addEventListener("click", togglePasswordVisibility);

// Biến để theo dõi trạng thái hiển thị của mật khẩu
var passwordVisible = false;

// Hàm để chuyển đổi hiển thị mật khẩu
function togglePasswordVisibility() {
    passwordVisible = !passwordVisible;
    
    if (passwordVisible) {
        passwordInput.style.display = "none"; // Ẩn trường nhập mật khẩu
        textInput.style.display = "block"; // Hiển thị trường text
        textInput.value = passwordInput.value; // Copy giá trị từ trường nhập mật khẩu sang trường text
        toggleButton.textContent = "Hide Password"; // Thay đổi văn bản của nút
    } else {
        passwordInput.style.display = "block"; // Hiển thị trường nhập mật khẩu
        textInput.style.display = "none"; // Ẩn trường text
        toggleButton.textContent = "Show Password"; // Thay đổi văn bản của nút
    }
}

