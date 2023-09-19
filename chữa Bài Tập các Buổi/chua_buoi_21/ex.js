var errors = {
    name: {
        required: "Vui lòng nhập họ tên",
        min: "Họ tên phải từ 5 ký tự"
    },
    email: {
        email: "Định dạng email không hợp lệ",
        unique: "Email đã có người sử dụng",
        required: "Vui lòng nhập địa chỉ email"
    },
    password: {
        required: "Vui lòng nhập mật khẩu",
        same: "Mật khẩu phải khớp với mật khẩu nhập lại"
    },

    confirm:{}
}

var getError = function (field) {
    if (errors[field]) {
        var error = errors[field];
        var key = Object.keys(error).at(0);
        return error[key];
    }
    return;
};
console.log(getError("email"));

// in ra 1 mảng mới và sắp xếp theo tuổi 
var customer = function (name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
};
var cust = [new customer("Nguyến Văn A", 11, "Hà Nộ"),
new customer("Nguyễn Văn B ", 2, " Hai Phòng"),
new customer("Nguyễn Văn C", 18, "TP.HCM")
];
var createCusstomer = function (cust) {
    if (cust.length) {
        cust = cust.map(function (custom) {
            var shortName = custom.name.split(' ').slice(0, 1).join() + ' ' + custom.name.split(' ').slice(-1).join();
            custom.shortName = custom.name;
            return custom;
        });
        cust.sort(function (a, b) {
            return a.age - b.age;
        });
        return cust
    }
}
var result = createCusstomer(cust);
console.log(result);



//Viết 1 hàm tạo để khởi tạo 1  đối tượng có 3 thuộc tính : name ,mk , emil
// tạo 1  hàm nhận vào nhiều tham số để khởi tạo 1 mảng chứa các đối tượng có cấu trúc như trên
// - kiểm tra tất cả thông tin có đầy đủ không nếu không đủ báo lỗi và dừng chương trình
// - nếu đăng kí 1 lần nữa phải trả về thông tin 2 người
// - tự động thêm role là user  cho mỗi đối tượng
// - tạo 1 hàm login nhận vào 2 tham số mk , email
// - nếu thông tin hợp lệ với 1 đối tượng trong mảng đã đăng kí trả về thông báo của đối tượng đó
//- nếu ko thì thông báo cho người dùng đăng nhập không hợp lệ

var User = function (name, pass, email) {
    this.name = name; 
    this.pass = pass;
    this.email = email;
};
var register = function (name, pass, email) {
    var error = {};
    if (!name ) {
    error.name= "tên ko dc để trống "
    } if (!email) {
        error.email= "email ko hợp lệ"
    } if (!pass) {
        error.pass= " sai Mật Khẩu "
    } if (Object.keys(error).length) {
        return error
    }
    var user = new User(name, pass, email);
    user.role = "user";
    data.push(user);
    return user; 
};
var handleLogin = function (email, pass) {
 
    var dataLogin = data.find(function (user) {
        return user.email === email && user.pass === pass;
    });
    if (dataLogin) {
        return dataLogin
    }
    return "thông tin ko hợp lệ "
   
};
var data = [];
var register1 = register("Nguyen Van B", "1234567", "nguyenvanb@email.com")
var dataLogin = handleLogin("nguyenvanb@email.com", "1234567")
console.log(dataLogin);