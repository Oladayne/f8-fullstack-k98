//bài 1
var getA = function  ( n ) {
  
  if(n==1 || n==2 ){
    return 1;
  }
  return getA(n-1) + getA(n-2);
}

var getB = function ( n ) {
if (n > 1) {
  return getA( n ) + " "+ getB(n - 1);   
}
return 1;
}
console.log(getB(10));

//bài 2
function reverseNumber(number) {
  const reversed = parseInt(number.toString().split('').reverse().join(''));
  return reversed;
}

const originalNumber = 12345;
const reversedNumber = reverseNumber(originalNumber);
console.log(`Kết quả đảo ngược của số ${originalNumber} là: ${reversedNumber}`);
//bài 3

function convert( n ){
  var numberstr=["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
  var str=["nghìn","trăm","mươi"];
  var a = parseInt(n/1000);

  var b =parseInt(n/100) % 10;
  
  var c = parseInt(n/10) % 10;
  
  var d=n%10;
  var temp='';
    if (a != 0) temp += " " + numberstr[a] + " " + str[0];
    if (b != 0) temp += " " + numberstr[b] + " " + str[1];
    if (c != 0) {
        temp += " " + numberstr[c] + " " + str[2];
    } else if (a != 0 || b != 0) {
        temp += " linh";
    }
    if (d != 0) temp += " " + numberstr[d];

    return temp;

}

console.log(convert(234));