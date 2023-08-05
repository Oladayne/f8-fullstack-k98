// Bài 1
var a = 1;
var b = 2;

[a, b] = [b, a];

console.log('Bài 1: a: '+ a + '; b: '+b);

// Bài 2
var S = 10 + 20 + Math.pow(5, 10) / 2;
console.log('Bài 2 :' + S);

// Bài 3
var a = 1,b = 2,c = 3;
console.log('bài 3: '+ Math.max(a,b,c));

// Bài 4
var a = -1,
  b = 1;

if (a * b > 0) {
  console.log("a, b cùng dấu");
} else {
  console.log("a, b khác dấu");
}

// Bài 5
var a = 20;
var  b = 10;
var  c = 7;

if (a > b) {
    [a, b] = [b, a];
}

if (a > c) {
    [a, c] = [c, a];
}

if (b > c) {
    [b, c] = [c, b];
}

console.log(`a : ${a}; b : ${b}; c : ${c}`);