// bài 1 
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
    }
}
var getError = function(key) {
    return (Object.values(errors[key])[0]); 
}
console.log(getError("name"));
    
/// bsi 2

var User = function(fullName, age, address) {
    this.name = fullName;
    this.age = age;
    this.address = address;
}

var getShortName = function(fullName) {
    var arr = fullName.split(" ");
    var shortName = [arr[0], arr[arr.length - 1]];
    return shortName.join(" ");
}
function createCustomers(customers) {
    var newArr = customers.map((arg, index) => {
        var user = new User(arg.name, arg.age, arg.address);
        user.shortName = getShortName(user.name);
        return user;
    });
    newArr.sort((a,b) => a.age - b.age);
    return newArr;
  }
  const customers = [
    { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
    { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
    { name: "Hoàng Văn D", age: 18, address: "Nam Định" },
    { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];  
  console.log(createCustomers(customers));

  //bài 3
  var User = function(name, password, email) {
    this.name = name;
    this.password = password;
    this.email = email;
}

const data = [];
var handleRegister = function(name , password, email) {
    if (!name || !password || !email) {
        return console.log("Thông tin không đầy đủ");
    };
    var user = new User(name, password, email);
    user.role = "user";
    data.push(user);
    return data;
    
   
}

const handleLogin = (email, password) => {
    for (const user of data) {
      if ((email === user.email) & (password === user.password)) {
        return user;
      }
    }
  
    console.log("Thông tin đăng nhập không hợp lệ");
  };
var dataRegister = handleRegister(
    "Nguyen Van A",
    "123456",
    "nguyenvana@email.com"
);
var dataRegister = handleRegister(
    "Nguyen Van B",
    "1234567",
    "nguyenvanb@email.com"
);
var dataRegister = handleRegister(
    "Nguyen Van H",
    "123456743",
    "nguyenvanH@email.com"
);
var dataRegister = handleRegister(
    "Nguyen Van G",
    // "121214124167",
    "nguyenvanG@email.com"
);
var dataRegister = handleRegister(
    "Nguyen Van B",
    "1234567",
    "nguyenvanb@email.com"
);
const dataLogin = handleLogin("nguyenvanb@email.com", "1234567");
console.log(data);
console.log(dataLogin);