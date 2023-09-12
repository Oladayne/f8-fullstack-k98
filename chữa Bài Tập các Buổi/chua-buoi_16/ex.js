// tính tiền taxi
var km = 10;
var price1 = 15200;
var price2 = 13500;
var price3 = 11000;
var discount = 10;
if (km <= 1) {
    cost= km * price1;
} else {
    if (km <= 5) {
        cost = 1 * price1 + (km - 1) * price2;
    } else {
        cost = 1 * price1 + (5 - 1) * price2 + (km - 5) * price3;
        if (km > 120) {
            cost = cost*(100-10)/100
        }
    }
}
console.log(cost);


// tính tiền điện 
var kwh = 100;
var level1 = 1678;
var level2 = 1743;
var level3 = 2014;
var level4 = 2536;
var level5 = 2834;
var level6 = 2927;
var cost;
if (kwh < 0) {
    console.log("vui lòng nhấp số lớn hơn 0");
} else if (kwh <= 50) {
    cost = kwh * level1;
} else if (kwh <= 100) {
    cost = 50 * level1 + (kwh - 50) * level2;
} else if (kwh <= 200) {
    cost = 50 * level1 + (100 - 50) * level2 + (kwh - 100) * level3;
} else if (kwh <= 300) {
    cost = 50 * level1 + (100 - 50) * level2 + (200 - 100) * level3 + (kwh - 200) * level4;
} else if (kwh <= 400) {
    cost = 50 * level1 + (100 - 50) * level2 + (200 - 100) * level3 + (300 - 200) * level4 + (kwh - 300) * level5;
} else{
    cost = 50 * level1 + (100 - 50) * level2 + (200 - 100) * level3 + (300 - 200) * level4 + (400 - 300) * level5 + (kwh - 400) * level6;
}
console.log(` số tiền phải trả cho ${kwh} số tiền điện là ${cost}`);


// tính giá trị biểu thức
// S = 1*2 + 2*3 + 3*4...
var n = 10;
var total = 0;
for (var i = 1; i <= n; i++){
    total += i * (i + 1);
}
console.log(total);


// kiểm tra 1 số có phải số nguyên tố không 
var isPrime = function (n) {
    if (n % 1 !== 0 || n <= 1) {
        return false;
    }
    for (var i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }
};
var number = 10;
if (isPrime(number)) {
    console.log("là số nguyên tố");
} else {
    console.log("ko phải số nguyên tố ");
}


// vẽ tam giác số
var x = 5;
var y = 0;
var output = '';
for (var i = 1; i <= n; i++){
    for (var j = 1; j <= i; j++){
        output += ++y + ' ';
    }
    output += '<br/>';
}
document.write(output);


// tạo hình bàn cờ
var columHTML = " ";
for (var rows = 1; rows <= 8; rows++){
    columHTML += `<tr`;
    for (var col = 1; col <= 8; col++){
        var total = col + rows;
        columHTML += `<td ${ total %2!==0?'class="black"':""}></td>`;
    }
    columHTML += `</tr>`;
}
var html = `<table border="1" width="100%" cellpadding="0" cellspacing="0">${columHTML}</table>`
document.write(html)



// vẽ bảng cửu chương 
var columnHtml = "<tr>";
for (var i = 1; i <= 5; i++){
    columnHtml += `<td>`;
    for (var j = 1; j <= 10; j++){
        columnHtml+=`${i}*${j}=${i*j}<br/>`
    }
    columnHtml += `</td>`;
}
columnHtml += `</tr>`;
columnHtml += `<tr>`;
for (var i = 6; i <= 10; i++){
    columnHtml += `<td>`;
    for (var j = 1; j <= 10; j++){
        columnHtml+=`${i}*${j}=${i*j}<br/>`
    }
    columnHtml += `</td>`;
}
columnHtml+=`</tr>`
var HTML = ` <table width="100%" cellpadding="0" cellspacing="0" border="1">
 ${columnHtml}
</table>`;
document.write(HTML)


// tính giá trị biểu thức ko cần vòng lặp (đệ quy)
// S = 1 +1/2 + 1/3 + 1/4 + 1/5 +...+1/n;
var getTotal = function (n) {
    console.log(n);
    if (n === 1) {
        return 1;
    }
    return 1/n + 1/getTotal(n-1);
};
var n = 20;
console.log(getTotal(n));