// tìm số lớn nhất nhỏ nhất và vị trí của nó 
var number = [
    5, 2, 1, 9, 8
];
var max = number[0];
var min = number[0];
var maxIndex = 0;
var minIndex = 0;
for (var i = 0; i < number.length; i++){
    if (max < number[i]) {
        max = number[i];
        maxIndex = i;
    }
    if (min > number[i]) {
        min = number[i];
        minIndex = i;
    }
}
console.log(`${max}`);
console.log(`${min}`);


//tính trung bình các số nguyên trong mảng nếu mảng không có số nguyên sẽ hiển thị thông báo 
var isPrime = function (n) {
    if (n <= 1 || n % 1 !== 0) {
        return false;
    }
    for (var i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
};
var total = 0;
var avg;
var count = 0;
for (var i = 0; i < number.length; i++){
    if (isPrime(number[i])) {
        total += number[i];
        count++;
    }
}
if (count > 0) {
    avg = total / count;
    console.log(`trung bình của các số nguyên tố là ${avg}`);
    console.log(`số lượng số nguyên tố là ${count}`);
} else {
    console.log("không có số nguyên tố");
}

// cho trước 1 mảng nếu trong mảng có 1 phần tử trùng nhau thì chỉ giữ lại 1 
var newArr = [];
for (var i = 0; i < number.length; i++){
    // kiểm tra nếu đã có thì sẽ bỏ qua 
    if (newArr.includes(number[i])) {
        continue;  
    }
    newArr[newArr.length] = number[i];
};
console.log(newArr);


// cho trước 1 mảng
// sắp sếp mảng theo thứ tự tăng dần
// chèn thêm 1 số vào bất kì vị trí nào vào trong mảng mà không làm thay đổi thứ tự sắp xếp của hàng
number.sort(function (a, b) {
    return a, b;
})
var element = 4;
if (element < number[0]) {
    number.unshift(element);
} else if(element>number[number.length-1]){
    number.push(element);
} else {
    var index;
    for (var i = 0; i < number.length; i++){
        if (element >= number[i] && element <= number[i+1]) {
            index = i;
            break;
        }
    }
    number = [].concat(number.slice(0, index + 1),element,number.slice(index+1));
}
console.log(number);