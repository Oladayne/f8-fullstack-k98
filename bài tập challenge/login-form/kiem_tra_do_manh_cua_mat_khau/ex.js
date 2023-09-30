let password = document.getElementById('password');
let power = document.getElementById('power-point');
let checkboxes = document.querySelectorAll('.check-item');
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
            default:
                break;
        }

        // Cập nhật trạng thái của ô kiểm dựa trên điều kiện
        checkbox.disabled = true;

        // Cập nhật trạng thái của ô kiểm dựa trên điều kiện
        checkbox.checked = condition;
    });
    let widthPower = ['1%','25%','50%','75%','100%'];
    let colorPower = ['#D73F40', '#DC6551', '#F2B84F', '#BDE952', '#30CEC7'];
    
    if (value.length >= 1) {
        let arrayTest = [
            /[0-9]/,
            /[a-z]/,
            /[A-Z]/,
            /[^0-9a-zA-Z]/];
        arrayTest.forEach(item => {
            if (item.test(value)) {
                point += 1;
            }
        });
    }
    power.style.width = widthPower[point];
    power.style.backgroundColor = colorPower[point];
}
