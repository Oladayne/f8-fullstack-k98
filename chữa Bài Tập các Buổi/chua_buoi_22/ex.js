// viết hàm tính tổng giá trị biểu thức
// hàm trả về giá trị
// ép ràng buộc kiểu dữ liệu là số
// kiểu dữ liệu truyền vào ko hợp lệ trả về thông báo 
var getTotal = function (...avgs) {
    console.log(avgs);
    if (avgs.length) {
        var total = 0;
        var check = avgs.every(function (number) {
            if (number !== null) {
                number = +number;
                total += number
                if (!Number.isNaN(number)) {
                    return true;
                }
            }
        });
        if (check) {
            return total
        }
        return "dữ liệu không hợp lệ"
    }
};
var result = getTotal(5, 10, 15, "20");
console.log(result);


// viết 1 phương thức prototype có tên là getcurrency có dối số truyền vào đơn vị tiền tệ 
var price = 12200;
Number.prototype.getCurrency = function (curency) {
    var value = this.valueOf();
    if (curency) {
        return value.toLocaleString() + " " + curency;
    }
    return value;
};
String.prototype.getCurrency = Number
console.log(price.getCurrency());