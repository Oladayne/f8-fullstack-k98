// hoán vị 2 số 
var a = 10; 
var b = 22;
console.log(a, b);
a = a + b;
b = a - b;
c = a - b;


// thực hiện phép toán 
var s = 10 + 20 + 5 ** 10 / 2;
console.log(s);


// tìm số lớn nhất 
var a = 10;
var b = 30;
var c = 5;
var max = a;
// giả định giá trị lớn nhất là số đầu tiên 
if (max<b) {
    max = b;
}
if (max<c) {
    max = c;
}
console.log("Max là:", max);


//kiểm tra số cùng dấu 
var a = 10;
var b = 20;
//kiểm jtra số a và b có cùng dấu hay không 
if (a * b >= 0) {
    console.log("cùng dấu");
} else {
    console.log("trái dấu");
}


//săp xếp 3 số 
var a = 10;
var b = 20;
var c = 30;
if (a > b) {
    var tmp = a;
    a = b;
    b = tmp;
} if (a > c) {
    var tmp = a;
    a = c;
    c = tmp;
} if (b > c) {
    var tmp = b;
    b = c;
    c = tmp;
}
console.log(a,b,c);
